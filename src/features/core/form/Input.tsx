import _ from "lodash"
import { useFieldContext } from "./useFieldContext"
import { ReactNode } from "react"

export type InputProps = {
    ///onInputValue?: (value: any) => any
    icon?: ReactNode
} & React.PropsWithChildren<React.ComponentPropsWithRef<'input'>>

export default function Input({ /*onInputValue,*/onClick, onChange, className, icon, value, ...props }: InputProps) {
    const context = useFieldContext()

    {/*onInput={(evt) => onInputValue?.(evt.currentTarget.value)}*/ }
    return <div onClick={onClick} className={`${className} bg-gray-100 border border-gray-200 
    text-gray-900 text-sm rounded-lg overflow-hidden
     w-full flex items-center`}>
        <input
            
            className="border-none w-full py-2 px-2.5 
            bg-transparent outline-none 
            "
            {...props}
            value={value ?? context?.value ?? ""}
            onChange={(evt) => {
                onChange?.(evt)
                context?.onChange(evt)
            }}
        />
        <span className="w-3 *:w-4 mr-2.5 ml-2.5">{icon}</span>

    </div>
}