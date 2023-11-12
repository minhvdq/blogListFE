import PropTypes from 'prop-types'

const LoginForm = ({handleLogin, username, password, handleUsername, handlePassword}) => {
  return(
    <form onSubmit = {handleLogin}>
      <div>
        username
        <input type = "text" name = "username" value = {username} onChange = {handleUsername} />
      </div>
      <div>
        password
        <input type='text' name = 'password' value = {password} onChange = {handlePassword} />
      </div>
      <button type='submit'> login </button>
    </form>
  )
}
loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired
}

export default LoginForm