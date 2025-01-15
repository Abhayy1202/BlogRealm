import React from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
      authService.logout().then(() => {
        dispatch(logout())
        navigate("/")
      })
      // console.log('logout')
    }
  return (
    <button
      className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-center"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn