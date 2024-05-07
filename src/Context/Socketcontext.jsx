import { createContext, useContext, useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";
import { io } from "socket.io-client"

export const Socketcontext = createContext()

export const Socketcontextprovider = ({ children }) => {

    const [socket, setsocket] = useState(null)
    const [onlineUsers, setonlineUsers] = useState([])
    const { authuser,setisLoggedIn,isLoggedIn } = useContext(Authcontext)




    useEffect(() => {
        if (authuser) {
            const socket = io("https://chat-app-1-75f6.onrender.com", {
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



    return <Socketcontext.Provider value={{socket,onlineUsers}}>
        {children}
    </Socketcontext.Provider>
}

