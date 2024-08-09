import React, { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { BaseModel, RequestResult } from "../requests/useApi"
import { useTranslation } from "react-i18next"
import useRequestHandler from "../requests/useRequestHandler"
import { useNavigate } from "react-router"
import Form, { FormRef } from "./Form"
import Button from "./Button"
import toast from "react-hot-toast"
import { FormApi, useForm } from "@tanstack/react-form"
import { zodValidator } from '@tanstack/zod-form-adapter'

export interface DataFormProps<T extends BaseModel> {
    id?: string
    onGetById?: (id: number) => Promise<RequestResult<T>>
    onCreate: (data: T) => Promise<RequestResult<T>>
    onUpdate: (data: Partial<T>, id: number) => Promise<RequestResult<void>>

    children: (Form: ReturnType<typeof useForm<T, ReturnType<typeof zodValidator>>>) => React.ReactNode
    defaultValues?: Partial<T>

    notFoundPath?: string
    successPath?: string
}

export interface DataFormRef<T extends BaseModel> {
    form: FormApi<T, ReturnType<typeof zodValidator>>
}

function DataForm<T extends BaseModel>(
    props: DataFormProps<T>,
    ref?: React.ForwardedRef<DataFormRef<T>>
) {
    const navigate = useNavigate()
    const id = props.id?.match(/^\d+$/g)?.at(0)
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const { handleRequest } = useRequestHandler()
    const formRef = useRef<FormRef<T>>(undefined!)

    let initialized = false

    const loadData = async () => {
        setLoading(true)
        toast.loading(t('loadingItem'), { id: 'loading' })
        const result = await handleRequest(() => props.onGetById!(parseInt(id!)))

        if (result?.data) {
            toast.loading(t('loadingItem.success'), { id: 'loading', duration: 1000 })
            //@ts-ignore
            for (const key in result.data) formRef.current.form.setFieldValue(key, result.data[key])
            toast.success(t('loadingItem.success'), { id: 'loading', duration: 1000 })
        }
        else {
            toast.dismiss('loading')
            if (props.notFoundPath) navigate(props.notFoundPath)
        }
        setLoading(false)
    }

    const onSave = async (data: T) => {
        setLoading(true)
        toast.loading(t('saving'), { id: 'saving' })
        const result = await handleRequest(() => data.Id ?
            props.onUpdate(data, data.Id) :
            props.onCreate(data))
        if (!result?.error) {
            toast.success(t('saving.success'), { id: 'saving', duration: 2000 })
            if (props.successPath) navigate(props.successPath)
        }
        else toast.dismiss('saving')
        setLoading(false)
    }

    useEffect(() => {
        if (!initialized) {
            if (id && props.onGetById) loadData()
        }
        return () => {
            initialized = true
        }
    }, [])

    useImperativeHandle(ref, () => ({
        form: formRef.current.form
    }))




    return <Form<T>
        defaultValues={props.defaultValues}
        ref={formRef}
        onSubmit={({ value }) => onSave(value)}
    >
        {(form) => <>
            <div className="mb-6 grid gap-3">
                {props.children(form)}
            </div>

            <form.Subscribe
                selector={state => ({
                    canSubmit: state.canSubmit
                })}
            >
                {state => <Button
                    disabled={!state.canSubmit}
                    loading={loading} >
                    Guardar
                </Button>}
            </form.Subscribe>
        </>}

    </Form>
}

export default forwardRef(DataForm) as
    <T extends BaseModel>(props: DataFormProps<T> & { ref?: ForwardedRef<DataFormRef<T>> }) =>
        ReturnType<typeof DataForm>;