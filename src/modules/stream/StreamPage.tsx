
import { useEffect } from "react"
import StreamLayout from "../layouts/StreamLayout"
import StreamVideo from "./StreamVideo"

export default () => {
    useEffect(()=>{
        
    },[])

    return <StreamLayout>
            <StreamVideo stream_id={import.meta.env.VITE_STREAM_ID}/>
        </StreamLayout>
}