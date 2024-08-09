import { useLocation } from "react-router"

export interface SidebarProps {
    status: boolean
    items: {
        label: string
        navigation: string
    }[]
}

export default function Sidebar(props: SidebarProps) {
    const location = useLocation()
    console.log(location.pathname)

    return <aside id="logo-sidebar" className={`bg-slate-900 text-white fixed top-0 
    left-0 z-40 w-72 
    h-screen transition-transform  duration-300 
    ${props.status ? 'lg:-translate-x-72 translate-x-0' : 'lg:translate-x-0 -translate-x-72'}
    
    `}>
        <ul className="pt-1 overflow-y-auto h-full text-slate-300 text-sm">
            {props.items.map((item, index) => <li 
            
            key={index}>
                
                {/*data-active={}*/}
                <a
                    href={`/#/${item.navigation}`}
                    className={`transition-all 
                    
                    cursor-pointer px-3 py-2 block
                    data-[active=true]:font-medium
                    data-[active=true]:text-white
                    mx-3 my-2 rounded-lg
                    hover:bg-slate-600 
                    hover:text-slate-200`}>
                    {item.label}
                </a>
            </li>)}
        </ul>
    </aside>

}