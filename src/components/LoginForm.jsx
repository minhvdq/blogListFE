import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, handleUsername, handlePassword }) => {
  return(
    <form onSubmit = {handleLogin}>
      <div>
        username
        <input id='username' type = "text" name = "username" value = {username} onChange = {handleUsername} />
      </div>
      <div>
        password
        <input id='password' type='text' name = 'password' value = {password} onChange = {handlePassword} />
      </div>
      <button id='login_button' type='submit'> login </button>
    </form>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired
}

export default LoginForm