import React, { useContext } from 'react'
import { Authcontext } from '../../Context/Authcontext'
import { extract } from '../extract'

function Message({ mess, index,newmsg}) {

    const { authuser, selectedConversation } = useContext(Authcontext)
    const fromMe = mess.senderId === authuser.id 
    const chatname = fromMe ? "chat-end" : "chat-start"
    const profilepic = fromMe ? authuser.imageurl : selectedConversation?.imageurl
    const chatcolor = fromMe ? "bg-red-500" : "bg-gray-800"
    const time=extract(mess.createdAt)
    return <>
    
        <div className={`chat ${chatname}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                <img src={`https://chat-app-1-75f6.onrender.com/`+profilepic}/>
                </div>

            </div>

            <div className={`chat-bubble text-white mb-1 ${chatcolor}`}>{mess.message}</div>
            <div className={`chat-footer text-white`}>{time}</div>

        </div>
    </>
}

export default Message
