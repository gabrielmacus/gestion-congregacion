import { forwardRef } from "react"
import Spinner from "../common/Spinner"

export type ButtonProps = {
    loading?: boolean
    mode?: 'default' | 'text' | 'text-border'
} & React.PropsWithChildren<React.ComponentPropsWithRef<'button'>>
function Button({ loading, children, disabled, mode, ...props }: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
    const defaultClass = `text-primary-contrast bg-primary hover:bg-primary-hover
    focus:ring-4  focus:ring-primary-focus  shadow-md rounded-md  px-3 py-1.5 focus:outline-none 
     active:shadow-none active:bg-primary
    `
    const textClass = `text-primary hover:bg-gray-300 p-2 rounded-md`

    const textBorderClass = `text-primary hover:bg-gray-300 p-2 rounded-md border border-primary`



    return <button
        disabled={loading || disabled}
        {...props}
        ref={ref}
        className={`
        ${!mode || mode == "default" ? defaultClass : ''}
        ${mode == "text" ? textClass : ''}
        ${mode == "text-border" ? textBorderClass : ''}
        flex justify-center items-center  gap-2 transition-all text-sm
        disabled:shadow-none disabled:pointer-events-none disabled:opacity-60`}
    >
        {children}
        {loading && <Spinner className="h-5" />}
    </button>
}


export default forwardRef(Button)