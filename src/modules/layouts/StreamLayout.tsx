import { PropsWithChildren } from "react";
import styled from "styled-components";
import StreamNavbar from "../stream/StreamNavbar";

const Container = styled.div``
const Content = styled.div` 
margin:auto;
`
export default function StreamLayout(props:PropsWithChildren){
    return  <Container>
        <StreamNavbar />
        <Content>
            {props.children}
        </Content>
    </Container>
}
