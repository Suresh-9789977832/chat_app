import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { Authcontext } from '../../Context/Authcontext'
import axios from 'axios'
import { env } from '../env'
import Skeleton from '../Skeleton'
import { Socketcontext } from '../../Context/Socketcontext'
import useListenmessages from '../Hooks/UselistenMessage'
import UselistenMessage from '../Hooks/UselistenMessage'

function Messages() {

    const { language,selectedConversation, authuser, setmessages, messages ,setchangemessages,changemessages} = useContext(Authcontext)
    const [loading, setloading] = useState(false)
    const messagescrollref = useRef()
    UselistenMessage()

    useEffect(() => {
        setTimeout(() => {
            messagescrollref.current?.scrollIntoView({ behaviour: "smooth" })
        }, 100);
    }, [messages])

    console.log(messages)


    useEffect(() => {
        setloading(true)
        const getmessages = async() => {
            try {
                let res = await axios.get(`${env.BASE_URL}/api/message/get/${selectedConversation._id}/${authuser.token}`)
                if (res.status == 200) {
                    setmessages(res.data)
                    setloading(false)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        if(selectedConversation?._id) getmessages()
        },[selectedConversation?._id])

    useEffect(() => {
        setloading(true)
        const changechatlanguage = async () => {
            let res = await axios.post(`${env.BASE_URL}/api/message/changelanguage/${authuser.token}`, { messages, language })
            if (res.status == 200) {
                setloading(false)
                setchangemessages(res.data)
            }
        }   
        changechatlanguage()
    }, [language])


    useEffect(() => {
        if (changemessages.length === messages.length) {
            for (let i = 0; i < messages.length; i++){
                messages[i].message = changemessages[i].message
              setmessages([...messages])
            }
            }
    },[changemessages])

    return <>
        <div className='px-4 overflow-auto flex-1'>
            
        {!loading && messages.length > 0 &&  messages.map((mess,i) => (
                        <div key={i} ref={messagescrollref}><Message  mess={mess} /></div> 
                     ))}

        
          
            {loading && [...Array(5)].map((_, ind) => <Skeleton key={ind} />)}
            {!loading && messages.length===0 && <p className='text-white text-center'>Send a message to start a Conversations</p> }
        </div>
    </>
}

export default Messages
