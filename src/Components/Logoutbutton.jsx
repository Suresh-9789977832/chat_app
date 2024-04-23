import axios from 'axios'
import { useContext } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { env } from './env'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../Context/Authcontext'

function Logoutbutton() {
  const navigate = useNavigate()
  const {setauthuser,setselectedConversation}=useContext(Authcontext)

  const handlelogout = async() => {
    try {
      let res = await axios.post(`${env.BASE_URL}/api/auth/logout`)
      if (res.status === 200) {
        localStorage.removeItem("value")
        setauthuser("")
        setselectedConversation(null)
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='mt-4 ml-2' onClick={handlelogout}>
        <BiLogOut className='w-6 h-6 cursor-pointer text-white'/>
    </div>
  )
}

export default Logoutbutton
