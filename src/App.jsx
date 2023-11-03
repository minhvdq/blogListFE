import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Norti from './components/Norti'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [norti,setNorti] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const creator = await loginService.login({username, password})
      setUser(creator)
    }
    catch(exception){
      setNorti("invalid user")
      setTimeout(() => {
        setNorti(null)
      }, 5000)
    }
  }
  const loginForm = () => (
    <form onSubmit = {handleLogin}>
      <h1> log in to application</h1>
      <div>
        username
        <input type = "text" name = "username" value = {username} onChange = {({target}) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type='text' name = 'password' value = {password} onChange = {({target}) => setPassword(target.value)} />
      </div>
      <button type='submit'> login </button>
    </form>
  )
  const blogMain = () => (
    <div>
      <h2>blogs</h2>
      <p> {user.username} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  return(
    <div>
      <Norti error = {norti} />
      {user === null && loginForm()}
      {user !== null && blogMain()}
    </div>
    
  )
}

export default App