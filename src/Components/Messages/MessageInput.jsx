import axios from 'axios'
import React, { useContext, useState } from 'react'
import { BsSend } from 'react-icons/bs'
import { env } from '../env'
import { Authcontext } from '../../Context/Authcontext'
import { Socketcontext } from '../../Context/Socketcontext'

function MessageInput() {

    const [sendmsg, setsendmsg] = useState('')
    const { selectedConversation, authuser, setmessages,messages} = useContext(Authcontext)
    const [loading, setloading] = useState(false)

    const handlesendmsg = async (e) => {

        e.preventDefault()
        if (!sendmsg) {
            return;
        }
        else {
            try {
                setloading(true)
                let res = await axios.post(`${env.BASE_URL}/api/message/send/${selectedConversation._id}/${authuser.token}`, { message: sendmsg })
                if (res.status === 201) {
                    setsendmsg("")
                    setloading(false)
                }
            } catch (error) {
                console.log(error)
            } 
        }
       
    }


    return <>
        <form className='px-4 my-3'>
            <div className='w-full relative'>
                <input type='text' className='border text-sm rounded-lg block w-full  p-2.5 bg-white border-gray-700 
                 text-black' placeholder='Type a message' onChange={(e) => setsendmsg(e.target.value)} value={sendmsg} />
                <button className='absolute inset-y-0 end-0 flex items-center pe-3' onClick={handlesendmsg}>{loading?<span className="loading loading-spinner loading-sm"></span>:<BsSend/>}</button>
            </div>
        </form>
    </>
}

export default MessageInput
