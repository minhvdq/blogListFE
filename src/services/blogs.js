import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request  = axios.post(baseUrl, newBlog, config )
  return request.then(response => response.data ) 
}

const update = ( id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(result => result.data)
}

const remove = ( id ) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then( response => response.data)
}
export default { getAll, create, setToken, update, remove}