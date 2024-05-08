import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { env } from '../Components/env'
import toast from 'react-hot-toast';
import { imgDB } from '../Firebase/firebase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function Singup() {

  const [imageurl, setimageurl] = useState('')
  const [loading,setloading]=useState(false)
  const [data, setdata] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
  })
  const navigate=useNavigate()


  function handlechange(e) {
    setdata({...data,[e.target.name]:e.target.value})
  }

  const handlesubmit=async(e) => {
    try {
      setloading(true)
      e.preventDefault()
      let res = await axios.post(`${env.BASE_URL}/api/auth/signup`, { data, imageurl })
      if (res.status === 201) {
        setloading(false)
        toast.success('User created successfully')
        navigate('/login')
      }

    } catch (error) {
      if (error.response.status === 400) {
        setloading(false)
        toast.error(error.response.data.message)
     }
    }
  }


  let handlefilechange = async (e) => {
    try {
      console.log(e.target.files[0])
      const imgs = ref(imgDB, `Imgs/${v4()}`)
      uploadBytes(imgs, e.target.files[0]).then(data => {
        console.log(data, "imgs")
        getDownloadURL(data.ref).then(val => {
         setimageurl(val)
        })
      })
    } catch (error) {
      
    }

  }

  



  return <>
   <div className='flex flex-col items-center justify-center mx-auto'>
      <div className=' p-4 h-full w-full bg-white-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40  border-gray-100'>
        <h1 className=' text-3xl  font-semibold text-center text-gray-300'>Signup</h1>
        <form>

        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>FullName</span>
          </label>
          <input type='text' placeholder='Enter fullname' className='w-full input input-bordered h-10' value={data.fullname} onChange={handlechange} name='fullname'/>
          </div>
          

        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Username</span>
          </label>
          <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' value={data.username} onChange={handlechange} name='username'/>
          </div>

          <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10' value={data.password} onChange={handlechange} name='password'/>
          </div>

          <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Confirm Password</span>
          </label>
          <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10' value={data.confirmpassword} onChange={handlechange} name='confirmpassword'/>
          </div>

          <div>
          <label className='label p-2 text-red-500'>
            <span className='text-base label-text'>Select Profile Picture</span>
          </label>
          <input type='file'  className='w-full input input-bordered h-10 p-1' multiple onChange={handlefilechange}/>
          </div>

        <img src='https://firebasestorage.googleapis.com/v0/b/textimage-92438.appspot.com/o/Imgs4e7f297e-e159-41a1-aafd-030eab95c778?alt=media&token=296cfa38-d362-49c8-b846-24655605124f'/>

          <Link  to={'/login'} className='text-sm hover:underline hover:text-blue-800 mt-2 inline-block'>
            Already have an account
          </Link>

          <div>
            <button className='btn btn-block btr-sm mt-2  font-semibold text-lg' onClick={handlesubmit}>{loading?<span className="loading loading-spinner loading-md"></span>:"Sign Up"} </button>
          </div>
        </form>
       
      </div>
         </div>  
  </>
}

export default Singup
