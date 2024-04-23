import { useContext } from 'react'
import Searchinput from './Searchinput'
import Conversations from './Conversations'
import Logoutbutton from './Logoutbutton'
import { Authcontext } from '../Context/Authcontext'

function Sidebar() {

    const { setlanguage }= useContext(Authcontext)

    return <>
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <Searchinput />
            <div className='flex justify-center outline-none h-8 '>
                <select className='w-60 bg-red-500 text-white px-2 rounded-md shadow-2xl border-none border-2' onChange={(e)=>setlanguage(e.target.value)}>
                    <option>---select your language---</option>
                <option>Tamil</option>
                <option>English</option>
                <option>Hindi</option>
                <option>Telugu</option>
                    <option>Malayalam</option>
            </select>
            </div>
            <div className='divider px-3'></div>
            <Conversations />
            <Logoutbutton/>
        </div>
    </>
}

export default Sidebar
