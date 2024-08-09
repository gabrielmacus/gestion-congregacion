import React from "react"
import styled from "styled-components"

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height:100%;
`

const ContentWrapper = styled.div`
max-width:350px;
width:90%;
`

export interface AuthLayoutProps {
    children: React.ReactElement
}

export default (props:AuthLayoutProps) => {

    return <Container>
        <ContentWrapper>{props.children}</ContentWrapper>
    </Container>
}