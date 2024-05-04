import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { env } from '../Components/env'
import toast from 'react-hot-toast'
import { Authcontext } from '../Context/Authcontext';

function Login() {
  
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [loading,setloading]=useState(false)
  const navigate=useNavigate()

  const {setauthuser,setisLoggedIn}=useContext(Authcontext)

  const handlelogin = async (e) => {
    e.preventDefault()
    try {
      setloading(true)
      let res = await axios.post(`${env.BASE_URL}/api/auth/login`, { username, password })
      if (res.status === 200) {
        setloading(false)
        setpassword("")
        setusername("")
        localStorage.setItem('value', JSON.stringify(res.data))
        setauthuser(res.data)
        navigate('/')
        setisLoggedIn(true)
      }
    } catch (error) {
      console.log(error)
      if (error?.response?.status === 400) {
        setloading(false)
        toast.error(error.response.data.message)
     }
    }
  }

  
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className=' p-4 h-full w-full bg-white-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40  border-gray-100'>
        <h1 className=' text-3xl  font-semibold text-center text-gray-300'>Login</h1>
        <form>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Username</span>
          </label>
          <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' onChange={(e)=>setusername(e.target.value)} value={username}/>
          </div>

          <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10' onChange={(e)=>setpassword(e.target.value)} value={password}/>
          </div>
          <Link  to={'/signup'}  className='text-sm hover:underline hover:text-blue-800 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>

          <div>
            <button className='btn btn-block btr-sm mt-2  font-semibold text-lg' onClick={handlelogin}>Login</button>
          </div>
        </form>
       
      </div>
         </div>
  )
}

export default Login
