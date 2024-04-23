import React, { useContext, useEffect } from 'react'
import { Socketcontext } from '../../Context/Socketcontext'
import { Authcontext } from '../../Context/Authcontext'

const UselistenMessage = () => {
    const { socket } = useContext(Socketcontext)
    const { messages, setmessages } = useContext(Authcontext)
    

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setmessages([...messages,newMessage])
        })

        socket?.on("newsendmsg", (newMessage) => {
            setmessages([...messages,newMessage])
        })


        return ()=>socket.off("newMessage")
    },[socket,setmessages,messages])

}

export default UselistenMessage
