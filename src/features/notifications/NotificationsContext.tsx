import { NotificationInstance } from "antd/es/notification/interface";
import { createContext } from "react";

export interface NotificationsContextProps {
    api: NotificationInstance
    contextHolder: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined)
export default NotificationsContext
