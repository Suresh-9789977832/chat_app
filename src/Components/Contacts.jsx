import { useContext } from 'react'
import { Authcontext } from '../Context/Authcontext'
import { Socketcontext } from '../Context/Socketcontext'

function Contacts({ data, index,loading}) {

    const { selectedConversation, setselectedConversation,language } = useContext(Authcontext)
    const {onlineUsers}=useContext(Socketcontext)
    const isonline = onlineUsers.includes(data._id)
    const isSelected = selectedConversation?._id === data._id

    
        return <>
        {loading ? 
            <div className="flex">
  <div className="skeleton rounded-full w-12 h-12 flex flex-col relative items-center">
  <div className="skeleton h-4 w-40   absolute left-16 top-"></div>
<div className="skeleton h-4 w-40 absolute left-16 top-6"></div>
</div>
        </div>
                :
                <div className={`flex gap-2  items-center hover:bg-red-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-red-500" : ""}`} onClick={() => setselectedConversation(data)} key={index}>
                    <div className={`avatar ${isonline ? "online" : ""}`} >
            <div className="w-12 rounded-full">
                <img src={`http://localhost:3000/`+data.imageurl}  className=''/>
            </div>
            </div>
            <div className='flex flex-col flex-1'>
                <p className='font-bold text-gray-200'>{data.fullname}</p>
            </div>
        </div>
        }
        <div className='divider my-0 py-0 h-1' />


      
        
    </>
}

export default Contacts
