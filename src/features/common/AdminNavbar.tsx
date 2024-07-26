import { MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Button, theme as antdTheme } from 'antd'

const Container = styled.div<{bg:string}>`
background-color:${props => props.bg};

display:flex;
justify-content:space-between;
align-items:center;
padding:0.3rem;
box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
font-size:1.65rem;
`

export interface AdminNavbarProps {
    onToggleSidebar:()=>any
}

export default function AdminNavbar(props:AdminNavbarProps) {
    const { useToken } = antdTheme
    const { token: theme } = useToken()
    

    return <Container bg={theme.colorPrimary}>
        
        <Button onClick={props.onToggleSidebar} size="large" icon={<MenuOutlined />} type="primary" />
        {theme.Button?.textHoverBg}
    </Container>


}