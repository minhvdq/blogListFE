import { useState } from 'react'

const BlogForm = ({ createBlog, curUser }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
      user: {
        id: curUser.id
      }
    }
    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <div>
      <form onSubmit={addBlog}>
        <div>
          title: <input id='title' type = "text" name = "title" value = {title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input id='author' type = "text" name = "author" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input id='url' type = "text" name = "url" value={url} onChange={({ target }) => {console.log(target.value); setUrl(target.value)}} />
        </div>
        <button type='submit'> submit</button>
      </form>
    </div>
  )
}

export default BlogForm