import styled from "styled-components";
import UserBadge from "../core/common/UserBadge";
import useStreamAuthContext from "../stream-auth/useStreamAuthContext";

const Container = styled.div`
background-color:white;
display:flex;
justify-content:space-between;
align-items:center;
padding:0.5rem;
box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`

const ParticipantsCounter = styled.span``

export default function StreamNavbar() {
    const authContext = useStreamAuthContext()

    return <Container>
        <UserBadge username={authContext.userData!.name} />
        <ParticipantsCounter>{`${authContext.userData!.participants} 
        ${authContext.userData!.participants > 1 ? 'participantes' : 'participante'}`}</ParticipantsCounter>
    </Container>
}