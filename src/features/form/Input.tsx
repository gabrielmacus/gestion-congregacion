import _ from "lodash"
import { useFieldContext } from "./useFieldContext"

export type InputProps = {
    ///onInputValue?: (value: any) => any
} & React.PropsWithChildren<React.ComponentPropsWithRef<'input'>>

export default function Input({ /*onInputValue,*/onChange,value, ...props }: InputProps) {
    const context = useFieldContext()

    {/*onInput={(evt) => onInputValue?.(evt.currentTarget.value)}*/ }
    return <input
        {...props}
        value={value ?? context.value ?? ""}
        onChange={(evt)=>{
            onChange?.(evt)
            context.onChange(evt)
        }}
        className='outline-none border-none bg-gray-100 border border-gray-300 
        text-gray-900 text-sm rounded-lg 
        block w-full p-2.5 
        '

    />
}