import Spinner from "../common/Spinner"

export type ButtonProps =  { 
    loading?: boolean
} & React.PropsWithChildren<React.ComponentPropsWithRef<'button'>>

export default function Button({loading, children, disabled,...props}: ButtonProps) {
    return <button 
        disabled={loading || disabled}
        {...props}
        className="flex justify-center  gap-2 text-primary-contrast bg-primary hover:bg-primary-hover
        focus:ring-4  focus:ring-primary-focus  shadow-md transition-all
        active:shadow-none active:bg-primary
        rounded-lg text-sm px-4 py-2 focus:outline-none 
        disabled:bg-primary-focus disabled:shadow-none
        disabled:pointer-events-none
        "
    >
        {children}
        {loading && <Spinner className="h-5" />}
    </button>
}