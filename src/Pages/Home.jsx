import React from 'react'
import Sidebar from '../Components/Sidebar'
import MessageContainer from '../Components/Messages/MessageContainer';

function Home() {
    return <>
        <div className='flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 max-tablet:ml-16 max-mbig:ml-[325px] max-mmedi:ml-[365px]  max-msmall:ml-[300px]'>
            <Sidebar />
            <MessageContainer />
        </div>
    </>
}

export default Home
