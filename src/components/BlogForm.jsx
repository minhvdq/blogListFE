import { useState } from 'react'

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => { 
        event.preventDefault()
        const blog = {
            title: title,
            author: author,
            url: url
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
                title: <input type = "text" name = "title" value = {title} onChange={({target}) => setTitle(target.value)} />
                </div>
                <div>
                author: <input type = "text" name = "author" value={author} onChange={({target}) => setAuthor(target.value)} />
                </div>
                <div>
                url: <input type = "text" name = "url" value={url} onChange={({target}) => {console.log(target.value); setUrl(target.value)}} />
                </div>
                <button type='submit'> submit</button>
            </form>
        </div>
    )
}

export default BlogForm