import { PropsWithChildren, createContext, useState } from "react"

export interface StreamUserData {
    name: string
    participants: number
}
export interface StreamAuthContextProps {
    userData?: StreamUserData
    setUserData: (data: StreamUserData) => any
    verifyAuth:()=>boolean
}

export const StreamAuthContext = createContext<StreamAuthContextProps>(undefined!)

const STORAGE_KEY = "_data"

export default function StreamAuthProvider(props: PropsWithChildren) {
    const [userData, setUserData] = useState<StreamUserData>()

    const saveUserData = (data: StreamUserData) => {
        setUserData(data)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }

    const verifyAuth = () => {
        if(userData) return true
        try{
            const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}")
            if(!data.name || !data.participants || isNaN(data.participants)) return false
            setUserData(data)
        }
        catch(e) { 
            console.debug(e)
            return false
        }
        return true
    }

    return <StreamAuthContext.Provider value={{
        userData,
        setUserData: saveUserData,
        verifyAuth
    }}>
        {props.children}
    </StreamAuthContext.Provider>
}
