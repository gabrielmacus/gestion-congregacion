import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Hls from "hls.js"
import {  Spin } from "antd"
import { EyeOutlined } from "@ant-design/icons"


const Container = styled.div`

`

const VideoContainer = styled.div`
width:100%;
display:flex;
background-color:black;
color:white;
justify-content:center;
align-items:center;
height:50vh;
`
const ErrorMessage = styled.div`
font-size:1.5rem;
font-weight:600;
text-align:center;
`
const ViewersCount = styled.div`
background-color:#616161;
color: white;
font-weight: 600;
display: flex;
justify-content: flex-end;
padding: 0.5rem;
`


export interface StreamVideoProps {
    streamId: string
    viewersCount?: number
    onShowParticipants?: () => any
}
const RETRY_PAUSE = 5000


//OEFTQEfcO9Skw0i1Pp4vI7f7vJwrEJ
export default function StreamVideo(props: StreamVideoProps) {
    const playerRef = useRef<HTMLVideoElement>(null)
    const uri = `${import.meta.env.VITE_STREAM_URL}/${props.streamId}/stream.m3u8`
    const [hlsSupported, setHlsSupported] = useState<boolean>()
    const [errorMessage, setErrorMessage] = useState<string>()
    const lastStreamStatus = useRef<("IDLE" | "LOADED")>("IDLE")

    useEffect(() => {
        setHlsSupported(Hls.isSupported());
    }, [])

    useEffect(() => {
        if (hlsSupported) loadHls()
        if (hlsSupported === false) setErrorMessage("Su dispositivo no soporta la reproducción de video en formato HLS")
    }, [hlsSupported])


    const loadHls = () => {
        console.debug("Loading hls...")
        const hls = new Hls({
            maxLiveSyncPlaybackRate: 1
        })

        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            console.debug('Video and hls.js are now bound together');
            hls.loadSource(uri);
        });
        hls.on(Hls.Events.MANIFEST_PARSED, function (_, data) {
            setErrorMessage(undefined)
            console.debug('Manifest loaded, found ' + data.levels.length + ' quality level',);
            playerRef.current!.play()
            lastStreamStatus.current = "LOADED"
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
            if (data.fatal) {
                hls.destroy();
                if (data.details === 'manifestIncompatibleCodecsError') {
                    setErrorMessage("Su dispositivo no soporta la reproducción de video en formato HLS")
                } else if (data.response && data.response.code === 404) {
                    if (lastStreamStatus.current == 'IDLE') setErrorMessage("La transmisión aún no ha iniciado")
                    if (lastStreamStatus.current == 'LOADED') setErrorMessage("Transmisión finalizada")
                } else {
                    setErrorMessage("Error al reproducir la transmisión. Reintentando...")
                }
                setTimeout(() => loadHls(), RETRY_PAUSE);
            }
        });

        hls.attachMedia(playerRef.current!)
    }

    const goLive = () => {
       // playerRef.current!.currentTime = playerRef.current!.duration - 1
    }

    return <Container>
        <VideoContainer>
            {hlsSupported === undefined && <Spin size="large" />}
            <div style={{
                height: '100%',
                width: '100%',
                display: hlsSupported === true && !errorMessage ? 'block' : 'none'
            }}>
                <video controls onPlay={goLive} ref={playerRef} style={{ width: '100%', height: '100%' }} />
            </div>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </VideoContainer>

        <ViewersCount>
            <span onClick={()=>props.onShowParticipants?.()}><EyeOutlined /> {props.viewersCount} {props.viewersCount == 1 ? 'lo está viendo' : 'lo están viendo'}</span>
        </ViewersCount>
    </Container>
}
