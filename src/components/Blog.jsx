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
  const showWhenTrue = { display : show ? '' : 'none' }

  const handleShow = ( event) => {
    event.preventDefault()
    setShow(!show)
  }

  const check = curUser.id === blog.user.id || curUser.id === blog.user
  const haveRemove = { display : check ? '': 'none' }
  console.log('current blog full', blog)
  console.log('current user full', curUser)
  console.log("current blog id: ", blog.user.id)
  console.log('current blog id 2', blog.user)
  console.log("current user: ", curUser.id)
  return(
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} <button onClick={handleShow}>{show ? 'hide' : 'view'}</button>
      <div style={showWhenTrue} className='moreInfor'>
        <a href={blog.url} >{blog.url}</a>
        <p>{blog.likes} <button id='likeButton' onClick={handleLike}>like</button></p>
        <p>{blog.user.username}</p>
        <button style = {haveRemove} onClick={deleteBlog}> remove </button>
      </div>
    </div>
  )
}


export default Blog