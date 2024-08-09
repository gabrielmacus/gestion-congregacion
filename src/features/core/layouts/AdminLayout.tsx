import { PropsWithChildren, useState } from "react"
import AdminNavbar from "../common/AdminNavbar"
import Sidebar from "../common/Sidebar"
import { Toaster } from "react-hot-toast"


export default function AdminLayout(props: PropsWithChildren) {
    const [sidebarStatus, setSidebarStatus] = useState(false)

    return <div className="bg-white h-full flex overflow-hidden ">
        <Sidebar 
        items={[
            {
                label:"Publicadores",
                navigation:"admin/publicadores"
            },
            {
                label:"Asignaciones",
                navigation:"admin/publicadores"
            }
        ]}
        status={sidebarStatus} />
        <div className={`${sidebarStatus?'lg:ml-0 ml-72':'lg:ml-72 ml-0'} h-full  w-full transition-all duration-300`}>
            <AdminNavbar onToggleSidebar={() => setSidebarStatus(!sidebarStatus)} />
            <div className="h-full py-8 px-8 max-w-5xl m-auto overflow-y-auto">
                {props.children}
            </div>
        </div>
        <Toaster />
    </div>
}