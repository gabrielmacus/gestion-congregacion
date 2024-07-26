import { PropsWithChildren, useEffect, useState } from "react"
import { BaseModel, RequestResult } from "../requests/useApi"
import { Button, Form, message } from "antd"
import { useForm } from "antd/es/form/Form"
import { useTranslation } from "react-i18next"
import useRequestHandler from "../requests/useRequestHandler"
import { useNavigate } from "react-router"

export interface DataFormProps<T extends BaseModel> extends PropsWithChildren {
    id?: string
    onGetById: (id: number) => Promise<RequestResult<T>>
    onCreate: (data: T) => Promise<RequestResult<T>>
    onUpdate: (data: Partial<T>, id: number) => Promise<RequestResult<void>>

    notFoundPath?: string
    successPath?: string

}
export default function DataForm<T extends BaseModel>(props: DataFormProps<T>) {
    const [form] = useForm()
    const navigate = useNavigate()
    const id = props.id?.match(/^\d+$/g)?.at(0)
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const { handleRequest } = useRequestHandler()

    let initialized = false

    const loadData = async () => {
        setLoading(true)
        message.open({
            key: 'loading',
            type: 'loading',
            content: t('loadingItem')
        })
        const result = await handleRequest(() => props.onGetById(parseInt(id!)))

        if (result?.data) {
            form.setFieldsValue(result.data)
            message.open({
                key: 'loading',
                type: 'success',
                content: t('loadingItem.success'),
                duration: 1
            })
        }
        else {
            message.destroy('loading')
            if (props.notFoundPath) navigate(props.notFoundPath)
        }
        setLoading(false)
    }

    const onSave = async (data: T) => {
        setLoading(true)
        message.open({
            key: 'saving',
            type: 'loading',
            content: t('saving')
        })
        
        const result = await handleRequest(() => data.Id ? props.onUpdate(data, data.Id) : props.onCreate(data))
        if (!result?.error) {
            message.open({
                key: 'saving',
                type: 'success',
                content: t('saving.success'),
                duration: 2
            })
            if (props.successPath) navigate(props.successPath)
        }
        else {
            message.destroy('saving')
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!initialized) {
            if (id) loadData()
        }
        return () => {
            initialized = true
        }
    }, [])

    return <Form
        onFinish={onSave}
        form={form}
    >
        {props.children}
        <Button loading={loading} htmlType="submit" type="primary">Guardar</Button>
    </Form>



}