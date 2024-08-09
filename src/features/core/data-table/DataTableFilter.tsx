import { FunnelIcon as FunnelSolid } from "@heroicons/react/24/solid";
import { FunnelIcon as FunnelOutline } from "@heroicons/react/24/outline";
import Form from "../form/Form";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Column } from "@tanstack/react-table";
import Popover from "../modal/Popover";
import { useState } from "react";


export interface DataTableFilterProps<T, TModel> {
    children: (form: ReturnType<typeof useForm<T, ReturnType<typeof zodValidator>>>)
        => React.ReactNode
    column: Column<TModel>
    checkIsFiltered: (value: T) => boolean
}


export default function DataTableFilter<T, TModel>(props: DataTableFilterProps<T, TModel>) {
    const filterValue = JSON.parse(props.column.getFilterValue() as string ?? "{}")
    const isFiltered = props.checkIsFiltered(filterValue)

    const [open, setOpen] = useState(false)
    const onFilter = (value: T) => {
        setOpen(false)
        props.column.setFilterValue(JSON.stringify(value))
    }

    return <Popover
        type="padded"
        open={open}
        onOpenChange={setOpen} trigger={
            <span className="cursor-pointer hover:opacity-70 transition-all">
                {isFiltered ? <FunnelSolid className="w-4" /> : <FunnelOutline className="w-4" />}
            </span>
        }>
        <Form<T>
            defaultValues={filterValue}
            onSubmit={({ value }) => onFilter(value)}>
            {props.children}
        </Form>
    </Popover>

}

