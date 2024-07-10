import styled from "styled-components"
import AuthLayout from "../layouts/AuthLayout"
import { Button, Form, Input, InputNumber } from "antd"
import useAuthContext from "./useStreamAuthContext"
import { useForm } from "antd/es/form/Form"
import { useNavigate } from "react-router"
import { StreamUserData } from "./StreamAuthProvider"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

const Container = styled.div``

export default function StreamAuthPage() {
    let [searchParams, _] = useSearchParams();
    const navigate = useNavigate()
    const authContext = useAuthContext()
    const [form] = useForm<StreamUserData>()

    const onSubmit = () => {
        const data = form.getFieldsValue()
        authContext.setUserData(data)
        navigate("/")
    }

    useEffect(() => {
        form.setFieldValue("name", searchParams.get("name"))
        form.setFieldValue("participants", searchParams.get("participants"))
        form.submit()
    }, [])

    return <AuthLayout>
        <Container>
            <Form layout="vertical" form={form} onFinish={onSubmit}>
                <Form.Item
                    required
                    rules={[{ required: true, message: "Campo requerido" }]}
                    name={"name"}
                    label={"Nombre"}>
                    <Input />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: "Campo requerido" }]}
                    name={"participants"}
                    label={"Participantes"}>
                    <InputNumber style={{ width: "100%" }} min={1} />
                </Form.Item>
                <Button style={{ width: "100%" }} htmlType="submit" type="primary">Ingresar</Button>
            </Form>
        </Container>
    </AuthLayout>
}