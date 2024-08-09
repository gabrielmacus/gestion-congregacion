import { FieldApi } from "@tanstack/react-form";
import { PropsWithChildren } from "react";
import { FieldContext } from "./useFieldContext";
import { zodValidator } from "@tanstack/zod-form-adapter";

export interface FieldProps<T> extends PropsWithChildren {
    label?: string
    field: FieldApi<T, any, any, ReturnType<typeof zodValidator>>
    hidden?: boolean
    required?: boolean
}

export default function Field<T>(props: FieldProps<T>) {
    return <FieldContext.Provider value={{
        value: props.field.state.value,
        onChange: (e) => props.field.handleChange(e.target.value)
    }}>
        <div className={`${props.hidden ? 'hidden' : ''}`}>
            {props.label &&
                <label className="mb-1 block text-sm">
                    {props.label} 
                    {props.required && <span className="text-red-600"> *</span>}
                </label>}
            <div>
                {props.children}
            </div>
            {props.field.state.meta.errors.length> 0 ? (
                <em role="alert" className="mt-1 block not-italic text-red-500  text-sm">
                    {props.field.state.meta.errors.join('. ')}</em>
            ) : null}
        </div>
    </FieldContext.Provider>
}