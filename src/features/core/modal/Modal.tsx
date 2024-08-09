import * as AlertDialog from '@radix-ui/react-alert-dialog';
import Button from '../form/Button';
import { useState } from 'react';

export interface ModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    description?: string
    className?: string
    okText?: string
    onConfirm?: () => any
    onCancel?: () => any
    cancelText?: string
}

export default function Modal(props: ModalProps) {
    const [loading, setLoading] = useState(false)

    const onConfirm = async () => {
        setLoading(true)
        await props.onConfirm?.()
        setLoading(false)
        props.onOpenChange(false)
    }
    const onCancel = async () => {
        await props.onCancel?.()
        props.onOpenChange(false)
    }

    return <AlertDialog.Root open={props.open} onOpenChange={props.onOpenChange}>
        <AlertDialog.Portal>
            <AlertDialog.Overlay
                onClick={() => props.onOpenChange(false)} className='bg-black opacity-70 fixed top-0 left-0 h-full w-full z-40' />
            <AlertDialog.Content className={`${props.className} max-w-[90%]
            p-5 rounded-lg
            w-[90%]  fixed top-[50%] left-[50%]
            -translate-x-[50%] -translate-y-[50%]
            bg-white z-50`}>
                {props.title && <AlertDialog.Title className='font-medium text-lg mb-3'>{props.title}</AlertDialog.Title>}
                {props.description && <AlertDialog.Description>{props.description}</AlertDialog.Description>}
                <div className='flex gap-2 justify-end'>
                    <Button disabled={loading}
                        onClick={onCancel}
                        mode='text-border'>{props.cancelText}</Button>
                    <Button onClick={onConfirm}
                        loading={loading}>{props.okText}</Button>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
}