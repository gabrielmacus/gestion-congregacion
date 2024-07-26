import useModal, { HookAPI } from "antd/es/modal/useModal"
import { PropsWithChildren, createContext } from "react"

export interface ModalContext {
    modal:HookAPI
}
export const ModalContext = createContext<ModalContext>(undefined!)

export default function ModalProvider(props: PropsWithChildren) {
    const [modal, contextHolder] = useModal()

    return <ModalContext.Provider value={{modal}}>
        {props.children}
        {contextHolder}
    </ModalContext.Provider>
}
