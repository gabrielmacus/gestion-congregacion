import { PopoverPanel as PopoverPanelHeadless } from "@headlessui/react";

export type PopoverPanelProps = React.ComponentProps<typeof PopoverPanelHeadless>

export default function PopoverPanel({className,...props}: PopoverPanelProps) {

    return (
        <PopoverPanelHeadless transition={true} {...props}
         className={`transition
        duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0
        absolute z-10 shadow-lg bg-gray-300 p-2 rounded-lg ${className ?? ""} `}  />
    )
}