import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Hls from "hls.js"
import { Spin } from "antd"
import ReactTimeout from 'react-timeout'


const Container = styled.div`

`
const VideoPlayer = styled.video`
height:50vh;
width:100%;
border:none;
background-color:black;
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
const VideoControls = styled.div``


export interface StreamVideoProps {
    stream_id: string
}
const RETRY_PAUSE = 5000


//OEFTQEfcO9Skw0i1Pp4vI7f7vJwrEJ
export default function StreamVideo(props: StreamVideoProps) {
    const playerRef = useRef<HTMLVideoElement>(null)
    const uri = `${import.meta.env.VITE_STREAM_URL}/${props.stream_id}/stream.m3u8`
    const [hlsSupported, setHlsSupported] = useState<boolean>()
    const [errorMessage, setErrorMessage] = useState<string>()

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
            maxLiveSyncPlaybackRate: 1.5
        })

        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            console.debug('Video and hls.js are now bound together');
            hls.loadSource(uri);
        });
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            setErrorMessage(undefined)
            console.debug('Manifest loaded, found ' + data.levels.length + ' quality level',);
            playerRef.current!.play()
        });

        hls.on(Hls.Events.ERROR, (evt, data) => {
            if (data.fatal) {
                hls.destroy();
                if (data.details === 'manifestIncompatibleCodecsError') {
                    setErrorMessage("Su dispositivo no soporta la reproducción de video en formato HLS")
                } else if (data.response && data.response.code === 404) {
                    setErrorMessage("La transmisión aún no ha iniciado")
                } else {
                    setErrorMessage("Error al reproducir la transmisión. Reintentando...")
                }



                setTimeout(() => loadHls(), RETRY_PAUSE);
            }
        });

        hls.attachMedia(playerRef.current!)

    }

    const goLive = () => {
        playerRef.current!.currentTime = playerRef.current!.duration - 1
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
                <VideoControls>

                </VideoControls>
            </div>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </VideoContainer>
    </Container>
}