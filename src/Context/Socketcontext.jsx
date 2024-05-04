import { createContext, useContext, useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";
import { io } from "socket.io-client"

export const Socketcontext = createContext()

export const Socketcontextprovider = ({ children }) => {

    const [socket, setsocket] = useState(null)
    const [onlineUsers, setonlineUsers] = useState([])
    const { authuser,setisLoggedIn,isLoggedIn } = useContext(Authcontext)


    console.log(authuser)


    useEffect(() => {
        if (authuser) {
            const socket = io("http://localhost:8000", {
                query: {
                    userId:authuser.id
                }
            })
            setsocket(socket)

            socket.on("getonlineusers", (users) => {
                setonlineUsers(users)
            })
            return ()=>socket.close()
        } 
        else {
            if (socket) {
                socket.close()
                setsocket(null)
            }
    }
    }, [authuser])


console.log(onlineUsers)

    return <Socketcontext.Provider value={{socket,onlineUsers}}>
        {children}
    </Socketcontext.Provider>
}

