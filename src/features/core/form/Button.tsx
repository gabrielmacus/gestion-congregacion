import { forwardRef } from "react"
import Spinner from "../common/Spinner"
import { clsx } from 'clsx'

export type ButtonProps = {
    loading?: boolean
    mode?: 'default' | 'text' | 'text-border'
} & React.PropsWithChildren<React.ComponentPropsWithRef<'button'>>
function Button({ loading, children, disabled, mode, ...props }: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
    return <button
        disabled={loading || disabled}
        {...props}
        ref={ref}
        className={clsx(`flex justify-center items-center 
        gap-2 transition-all text-sm
        disabled:shadow-none disabled:pointer-events-none 
        disabled:opacity-60`, {
            [`text-primary-contrast-500 bg-primary-500
            hover:bg-primary-400 hover:text-primary-contrast-400 focus:ring-4  
            focus:ring-primary-300 shadow-md rounded-md  
            px-3 py-1.5 focus:outline-none 
            active:shadow-none active:bg-primary-500
            active:text-primary-500-contrast
            `]: !mode || mode == 'default',
            [`text-primary-500 hover:bg-gray-300
            p-2 rounded-md`]: mode == 'text',
            [`text-primary-500 hover:bg-gray-300 p-2 
            rounded-md border border-primary-500`] : mode == 'text-border'
        })}
    >
        {children}
        {loading && <Spinner className="h-5" />}
    </button>
}


export default forwardRef(Button)