import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Norti from './components/Norti'
import blogService from './services/blogs'
import loginService from './services/login'
import Er from './components/Er'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [norti,setNorti] = useState(null)
  const [error,setError] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('localBlogappUser')
    if(loggedUser){
      const curUser = JSON.parse(loggedUser)
      console.log(curUser)
      setUser(curUser)
      console.log(curUser.token)
      blogService.setToken(curUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const creator = await loginService.login({username, password})
      setUser(creator)
      window.localStorage.setItem('localBlogappUser', JSON.stringify(creator))
      blogService.setToken(creator.token)
      setUsername('')
      setPassword('')
    }
    catch(exception){
      setError("Wrong username or password")
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleLike = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = {...blog, likes : blog.likes+= 1}
    blogService.update(id, changedBlog)
    .then(result => setBlogs(blogs.map(blog => blog.id === id ? result : blog)))
  }

  const addBlog = (blogObject) => {
    blogService.create(blogObject)
    .then(result => {
      console.log(result)
      setBlogs(blogs.concat(result))
      setNorti(`Blog ${blogObject.title} by ${blogObject.author} was added `)
      setTimeout(() => {
        setNorti(null)
      }, 5000)
    })
    .catch(error => {
      setError("invalid Blog format")
      setTimeout(() => {
        setError(null)
      }, 5000)
    })
  }
  
  const deleteBlog = (id) => {
    const blog = blogs.find( blog => blog.id === id)
    if(window.confirm(`Remove${blog.title} by ${blog.author} ?`)){
      blogService.remove(id)
      .then(result => {
        setBlogs( blogs.filter( blog => blog.id != id))
      })
      .catch( error => {
        setError(`Blog ${blog.title} has already been removed`)
      })
    }
  }

  const handleUsername = ({target}) => setUsername(target.value)
  const handlePassword = ({target}) => setPassword(target.value)

  const loginForm = () => (
    <Togglable labelName = "log in">
      <LoginForm username = {username} password = {password } handleLogin={handleLogin}
      handleUsername = {handleUsername} handlePassword={handlePassword} />
    </Togglable>
  )
  const blogMain = () => (
    <div>
      <h2>blogs</h2>
      <p> {user.username} logged in</p>
      <button onClick={ handleLogout}> log out</button>
      <Togglable labelName = "add new blog">
        <BlogForm createBlog = {addBlog} />
      </Togglable>
      {blogs.map(blog =>(
          <Blog key={blog.id} blog={blog} curUser = {user} handleLike = {() => handleLike(blog.id)} deleteBlog = {() => deleteBlog(blog.id)} />
        )
      )}
    </div>
  )
  return(
    <div>
      <Er error = {error} />
      <Norti error = {norti} />
      {user === null && loginForm()}
      {user !== null && blogMain()}
    </div>
    
  )
}

export default App