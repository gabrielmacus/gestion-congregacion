import styled from "styled-components";

const Container = styled.div`
display:flex;
align-items:center;
gap:1rem;
`
const ProfilePic = styled.img`
width:35px;
`
const Username = styled.span`
font-weight:600;
`
export interface UserBadgeProps {
    picture?: string
    username: string
}

const DEFAULT_PIC = "/profile-default.svg"

export default function UserBadge(props: UserBadgeProps) {
    return <Container>
        <ProfilePic src={props.picture ?? DEFAULT_PIC} />
        <Username>{props.username}</Username>
    </Container>

}