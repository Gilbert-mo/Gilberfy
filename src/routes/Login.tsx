import { useEffect } from 'react'
import { getAuthURL } from '../api/APIservices'
import { useLocation } from 'react-router-dom'

function Login() {

  const location = useLocation()

  function handleLogin() {
    getAuthURL()
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const code = urlParams.get('code')
    // console.log(code)

    if (code) {
      localStorage.setItem('isLoggedIn', 'true')
    } else {
      localStorage.setItem('isLoggedIn', 'fasle')
    }

  }, [location])

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login in</button>
    </div>
  )
}

export default Login
