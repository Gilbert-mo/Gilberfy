import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { getToken } from "../api/APIservices";

function AuthCallback() {

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search)
    let code = urlParams.get('code')

    if (!code) {
      throw new Error('The code is invalid JODEEEEEERRRRRRRR')
    }

    try {
      // console.log(code)
      getToken(code)
      navigate('/')

    } catch (err) {
      console.log(err, 'Gilbertfy')
    }

  }, [location, navigate])

  return (
    <div>
      <p>loading...</p>
    </div>
  )
}

export default AuthCallback
