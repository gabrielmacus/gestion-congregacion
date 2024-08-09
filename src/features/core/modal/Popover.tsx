import * as RadixPopover from '@radix-ui/react-popover';

export interface PopoverProps {
    trigger: React.ReactNode
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    type?:'default'|'padded'
}

const Popover = (props: PopoverProps) => {

    return (
        <RadixPopover.Root open={props.open} onOpenChange={props.onOpenChange}>
            <RadixPopover.Trigger asChild>
                {props.trigger}
            </RadixPopover.Trigger>
            <RadixPopover.Portal>
                <RadixPopover.Content sideOffset={5} 
                className={`overflow-hidden rounded-lg shadow-2xl 
                ${props.type == 'padded' ? 'p-2 bg-gray-300 dark:bg-gray-800 dark:text-white' :''}`}  >
                    <RadixPopover.Arrow 
                    className={`fill-white 
                    ${props.type == 'padded' ? 'fill-gray-300 dark:fill-gray-800 ' :''}
                    `} height={6} width={12} />
                    {props.children}
                </RadixPopover.Content>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    )
}

export default Popover