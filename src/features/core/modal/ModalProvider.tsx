import { PropsWithChildren, createContext, useState } from "react"
import Modal from "./Modal"

interface ModalProps{
    title?:string
    content?:string
    className?:string
    okText?:string
    cancelText?:string
    onConfirm?:()=>any
    onCancel?:()=>any
}

export interface ModalContext {
    open:(props:ModalProps)=>any
}
export const ModalContext = createContext<ModalContext>(undefined!)

export default function ModalProvider(props: PropsWithChildren) {
    const [opened, setOpened] = useState(false)
    const [modalProps, setModalProps] = useState<ModalProps>()

    const openModal = (props:ModalProps) => {
        setModalProps(props)
        setOpened(true)
    }

    return <ModalContext.Provider value={{open:openModal}}>
        {props.children}
        <Modal 
        {...modalProps}
        onOpenChange={(open)=>setOpened(open)} 
        open={opened} />
    </ModalContext.Provider>
}
