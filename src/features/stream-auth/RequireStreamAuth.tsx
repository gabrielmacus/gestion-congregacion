import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";
import useStreamAuthContext from "./useStreamAuthContext";

export default function RequireStreamAuth(props: PropsWithChildren) {

    const context = useStreamAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!context.verifyAuth()) return navigate("/streaming/login")
    }, [])


    return <>
        {context.userData && props.children}
    </>

}