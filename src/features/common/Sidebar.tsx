import styled from "styled-components"
import {  Button, theme as antdTheme } from 'antd'

const Container = styled.nav<{bg:string}>`
background:${props => props.bg};
width:100%;
height:100%;
`



export interface SidebarProps {
 
}

export default function Sidebar(props: SidebarProps) {
    const { useToken } = antdTheme
    const { token: theme } = useToken()

    return <Container bg={theme.colorPrimaryHover}>
        <a>a</a> 
    </Container>

}