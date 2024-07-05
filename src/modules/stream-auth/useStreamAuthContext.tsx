import { useContext } from "react";
import { StreamAuthContext } from "./StreamAuthProvider";


export default function useStreamAuthContext() {
    const context = useContext(StreamAuthContext)
    if (!context) throw new Error("useStreamAuthContext must be used within an StreamAuthContextProvider")
    return context
}