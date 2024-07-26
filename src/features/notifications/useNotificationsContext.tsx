import { useContext } from "react";
import NotificationsContext from "./NotificationsContext";

export default function useNotificationsContext() {
    const context = useContext(NotificationsContext)
    if (!context) throw new Error("useNotificationsContext must be used within an NotificationsContextProvider")
    return context
}