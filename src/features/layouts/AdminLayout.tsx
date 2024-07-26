import { PropsWithChildren, useState } from "react"
import styled from "styled-components"
import AdminNavbar from "../common/AdminNavbar"
import Sidebar from "../common/Sidebar"

const Body = styled.div``
const Container = styled.div`
height:100%;
display:grid;
transition:grid-template-columns 0.2s;
grid-template-columns:0px 1fr;
&.show-sidebar{
    grid-template-columns:300px 1fr;
}
`
const Content = styled.div` 
margin:auto;
padding:2rem 2rem;
`
export default function AdminLayout(props: PropsWithChildren) {
    const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768)

    return <Container className={`${showSidebar ? "show-sidebar" : ""}`}>
        <Sidebar />
        <Body>
            <AdminNavbar onToggleSidebar={() => setShowSidebar(!showSidebar)} />
            <Content>
                {props.children}
            </Content>
        </Body>
    </Container>
}