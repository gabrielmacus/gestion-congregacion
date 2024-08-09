import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import Input from "./Input"
import { Fragment, useEffect, useState } from "react"
import OutsideClickHandler from 'react-outside-click-handler';
import { Float } from '@headlessui-float/react'
import { ChevronUpIcon } from "@heroicons/react/16/solid";

export interface SelectOption<T> {
    label: string
    value: T
}

export interface SelectProps<T> {
    options: SelectOption<T>[]
    onChange?: (value: T) => void
    value?: any
    className?: string
}

export default function Select<T>(props: SelectProps<T>) {
    const [open, setOpen] = useState(false)



    return (
        <div className={`cursor-pointer relative ${props.className}`}>
            <OutsideClickHandler
                onOutsideClick={() => setOpen(false)}
            >
                <Float
                    enter="transition duration-100 ease-out"
                    enterFrom="scale-95 opacity-0"
                    enterTo="scale-100 opacity-100"
                    leave="transition duration-150 ease-in"
                    leaveFrom="scale-100 opacity-100"
                    leaveTo="scale-95 opacity-0"
                    tailwindcssOriginClass
                    portal
                    adaptiveWidth
                    show={open}>
                    <div >
                        <Input
                            onClick={() => setOpen(!open)}
                            readOnly
                            className="*:cursor-pointer font-medium"
                            value={props.options.find(option => option.value == props.value)?.label ?? props.value}
                            icon={open ? <ChevronUpIcon /> : <ChevronDownIcon />} />
                    </div>
                    <div>
                        <div className="shadow-md bg-gray-200 overflow-hidden rounded-md">
                            {props.options.map((option, index) =>
                                <div
                                    onClick={() => props.onChange?.(option.value)}
                                    key={index}
                                    className={`flex transition-all 
                                justify-between
                                text-gray-800 py-2 px-3 hover:bg-gray-300 cursor-pointer
                        text-sm ${option.value == props.value ? 'font-medium' : ''}`}>
                                    {option.label}
                                    {option.value == props.value &&
                                        <CheckCircleIcon className="fill-primary w-5" />}
                                </div>
                            )}
                        </div>
                    </div>
                </Float>
            </OutsideClickHandler>
        </div>
    )

}