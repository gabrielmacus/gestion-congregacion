import { FormApi, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";

export type FormProps<T> = {
    children: (form: ReturnType<typeof useForm<Partial<T>, ReturnType<typeof zodValidator>>>) => React.ReactNode
    defaultValues?: Partial<T>
    onSubmit: (props: { value: T }) => any | Promise<any>

} //& React.ComponentProps<"form">


export interface FormRef<T> {
    form: FormApi<Partial<T>, ReturnType<typeof zodValidator>>
}

function Form<T>({ children, onSubmit, defaultValues, ...props }: FormProps<T>,ref?: React.ForwardedRef<FormRef<T>>) {
    const form = useForm<Partial<T>, ReturnType<typeof zodValidator>>({
        onSubmit: ({ value }) => onSubmit({ value: value as T }),
        validatorAdapter: zodValidator(),
        defaultValues
    })

    useImperativeHandle(ref, () => ({
        form
    }))

    return <form {...props}
        onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}
    >

    </form>
}

export default forwardRef(Form) as
    <T>(props: FormProps<T> & { ref?: ForwardedRef<FormRef<T>> }) =>
        ReturnType<typeof Form>;