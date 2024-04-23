import React, { useContext } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
import { Authcontext } from '../../Context/Authcontext';

function MessageContainer() {

const {selectedConversation}=useContext(Authcontext)

    return <>
        <div className='flex flex-col w-[450px]  max-tablet:w-[400px] max-mbig:w-[350px] max-msmall:w-[300px] '>
            {!selectedConversation ? <NoChatSelected/>:
          <>
          <div className='bg-slate-500 py-2 px-4 mb-2'>
              <span className='label-text'>To:</span>
                        <span className='text-gray-900 font-bold'>{selectedConversation.fullname}</span>
          </div>
              <Messages/>
              <MessageInput/>

          </>}
        </div>
    </>
}

export default MessageContainer


const NoChatSelected = () => {
    const {authuser}=useContext(Authcontext)

    return <>
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center  text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p><span className='text-3xl'>W</span>elcome {authuser.fullname}</p>
                <p>Select a chat start messaging</p>
                <TiMessages className='text-6xl items-center'/>
                </div>
        </div>
    </>
}
