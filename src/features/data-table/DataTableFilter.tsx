import { Column } from "@tanstack/react-table";
import { Select } from "antd";
import { DataTableColumnDef } from "./DataTable";
import { useState } from "react";
import { PopoverButton, Popover } from "@headlessui/react";
import { FunnelIcon as FunnelSolid, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FunnelIcon as FunnelOutline } from "@heroicons/react/24/outline";
import Input from "../form/Input";
import Button from "../form/Button";
import Form from "../form/Form";
import PopoverPanel from "../modal/PopoverPanel";
import Field from "../form/Field";


export interface DataTableFilterProps<T> {
    columnDef?: DataTableColumnDef<T>
    column: Column<T>
    onFilter: () => Promise<any>
}

interface FilterModel {
    filter: any
}

export default function DataTableFilter<T>(props: DataTableFilterProps<T>) {
    const type = props.columnDef?.meta?.filterType
    const [isFiltered, setIsFiltered] = useState(false)
    const value = props.column.getFilterValue() as any
    const [loading, setLoading] = useState(false)

    const onFilter = async () => {
        setLoading(true)
        setIsFiltered(props.column.getIsFiltered())
        await props.onFilter()
        setLoading(false)
    }

    return !type ? undefined :
        <Popover>
            <PopoverButton as="div" className={"outline-none"}>
                {isFiltered ? <FunnelSolid className="w-4" /> : <FunnelOutline className="w-4" />}
            </PopoverButton>
            <PopoverPanel >
                {({ close }) =>
                    <Form<FilterModel>
                        onSubmit={({ value }) => {

                        }}
                    >
                        {(Form) => <>
                            {type == 'text' &&

                                <div className="flex">
                                    <Form.Field
                                        name="filter"
                                    >
                                        {field => <Field field={field}>
                                            <Input
                                                name={'filter'}
                                                disabled={loading}
                                                value={value}
                                            />
                                        </Field>}
                                    </Form.Field>
                                    <Button
                                        type="submit"
                                        onClick={async () => {
                                            await onFilter()
                                            close()
                                        }}
                                    ><MagnifyingGlassIcon className="h-5" /></Button>
                                </div>
                            }
                            {type == 'number' &&
                                <div>
                                    <Input
                                        type="number"
                                        disabled={loading}
                                        onChange={(evt) => props.column.setFilterValue(evt.target.value)}
                                        value={value}
                                    />
                                    <Button type="submit" onClick={async () => {
                                        await onFilter()
                                        close()
                                    }} />
                                </div>
                            }
                            {type == 'select' &&
                                <div>
                                    <select
                                        onChange={(val: any) => props.column.setFilterValue(val.toString())}
                                        value={value}
                                    >
                                        {props.columnDef!.meta!.options!.map(o =>
                                            <Select.Option
                                                key={o.value}
                                                value={o.value}>{o.label}</Select.Option>)}
                                    </select>
                                    <button type="submit" onClick={async () => {
                                        await onFilter()
                                        close()
                                    }} />
                                </div>
                            }

                        </>}
                    </Form>}
            </PopoverPanel>
        </Popover>

}