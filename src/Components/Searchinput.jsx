import React from 'react'
import { BsChatRightText } from "react-icons/bs";
import { Link } from 'react-router-dom';


function Searchinput() {
    return <>
        <Link to={'/'} className='flex justify-center items-center gap-3 my-3  w-80 max-msmall:w-[200px] bg-red-500 rounded-lg  max-mbig:mx-5'>
                <p><BsChatRightText className=' text-white text-2xl'/></p> 
                    <h2 className='py-5 flex justify-center text-white font-semibold text-2xl'>
                        <p><span className=' text-2xl font-extralight '>C</span>hit <span className='font-extralight text-2xl'>C</span>hat</p>
                    </h2>
            </Link>
    </>
}

export default Searchinput
