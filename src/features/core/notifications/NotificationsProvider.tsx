import { PropsWithChildren } from "react";
import NotificationsContext from "./NotificationsContext";
import { notification } from 'antd'

export default function NotificationsProvider(props: PropsWithChildren) {
    const [api, contextHolder] = notification.useNotification({stack:true,duration:0})

    return <NotificationsContext.Provider value={{ api, contextHolder }}>
        {contextHolder}
        {props.children}
    </NotificationsContext.Provider>
}