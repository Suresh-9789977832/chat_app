import { createContext, useState } from "react";


export const Authcontext = createContext()

export const AuthContextProvider = ({ children }) => {
    

    const [authuser, setauthuser] = useState(JSON.parse(localStorage.getItem("value")) || null)
    const [selectedConversation, setselectedConversation] = useState(null)
    const [messages, setmessages] = useState([])
    const [language, setlanguage] = useState('')
    const [changemessages, setchangemessages] = useState([])
    const [isLoggedIn, setisLoggedIn] = useState(false);





    return <Authcontext.Provider value={{
        setauthuser, authuser, selectedConversation,
        setselectedConversation, setmessages, messages,
        setlanguage, language, setchangemessages, changemessages
        ,setisLoggedIn,isLoggedIn
    }}>
        {children}
    </Authcontext.Provider>
}