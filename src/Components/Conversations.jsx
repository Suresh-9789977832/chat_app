import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { env } from './env'
import { Authcontext } from '../Context/Authcontext'
import Contacts from "../Components/Contacts"

function Conversations() {

  const { authuser } = useContext(Authcontext)
  const [con, setcon] = useState([])
  const [loading, setloading] = useState(false)

  
  useEffect(() => {
    setloading(true)
        const getcontacts = async () => {
          try {
            let res = await axios.get(`${env.BASE_URL}/api/users/${authuser.token}`,)
            if (res.status === 200) {
              setcon(res.data)
              setloading(false)
            }
            } catch (error) {
              console.log(error)              
            }
        }
        getcontacts()
      }, [])
  
  
  return (
    <div className='py-1 flex flex-col overflow-auto'>
      {
        con.map((e, i) => (
          <div key={i}>
          <Contacts
            index={i}
            data={e}
            loading={loading}
            />    
            </div>
        ))
      }
    </div>
  )
}

export default Conversations
