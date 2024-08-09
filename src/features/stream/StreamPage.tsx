
import { useEffect, useMemo, useRef, useState } from "react"
import StreamLayout from "../core/layouts/StreamLayout"
import StreamVideo from "./StreamVideo"
import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr"
import useStreamAuthContext from "../stream-auth/useStreamAuthContext"
import { StreamUserData } from "../stream-auth/StreamAuthProvider"
import { List, Modal } from "antd"

const streamHub = new HubConnectionBuilder()

export default () => {
    const authContext = useStreamAuthContext()
    const streamHubConnection = useRef<HubConnection>()
    const [viewers, setViewers] = useState<StreamUserData[]>([])
    const [showViewers, setShowViewers] = useState(false)
    const viewersCount = useMemo(() => viewers
        .map(v => v.participants)
        .reduce((prev, current) => prev + current, 0),
        [viewers])

    const disconnectHub = async () => {
        if (streamHubConnection.current?.state == HubConnectionState.Connected)
            await streamHubConnection.current?.stop()
    }
    const connectHub = async () => {
        if (streamHubConnection.current) return
        streamHubConnection.current = streamHub
            .withAutomaticReconnect()
            .withUrl(`${import.meta.env.VITE_HUB_URL}/stream/${authContext.userData!.name}/${authContext.userData!.participants}`)
            .build()

        streamHubConnection.current.on('Viewers', (viewers: StreamUserData[]) => {
            setViewers(viewers)
        })
        await streamHubConnection.current.start()
    }

    useEffect(() => {
        connectHub()
        return () => {
            disconnectHub()
        }
    }, [])

    return <StreamLayout>
        <Modal
            open={showViewers}
            onOk={() => setShowViewers(false)}
            onCancel={() => setShowViewers(false)}
            onClose={() => setShowViewers(false)}
            footer={[]}
        >
            <List
                dataSource={viewers}
                renderItem={(item, _) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.name}
                            description={`${item.participants} ${item.participants > 1 ? 'participantes' : 'participante'}`}
                        />
                    </List.Item>
                )}
            />
        </Modal>
        <StreamVideo onShowParticipants={() => setShowViewers(true)} streamId={import.meta.env.VITE_STREAM_ID} viewersCount={viewersCount} />
    </StreamLayout>
}