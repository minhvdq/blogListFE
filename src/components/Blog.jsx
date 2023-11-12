import { useState } from 'react'
import blogServices from '../services/blogs'

const Blog = ({ blog, handleLike, deleteBlog, curUser }) => {
  const [show, setShow ] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenTrue = { display : show ? '' : 'none'}

  const handleShow = ( event) => {
    event.preventDefault()
    setShow(!show)
  }

  const haveRemove = { display : curUser.id === blog.user.id ? '': 'none'}

  console.log(blog.id)
  return(
    <div style={blogStyle}>
      {blog.title} <button onClick={handleShow}>{show ? 'hide' : 'view'}</button>
      <div style={showWhenTrue}>
        <a href={blog.url} target='_blank'>{blog.url}</a>
        <p>{blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.author}</p>
        <button style = {haveRemove} onClick={deleteBlog}> remove </button>
      </div>
    </div>  
  )
}
  

export default Blog