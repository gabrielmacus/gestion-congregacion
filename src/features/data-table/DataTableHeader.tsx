import { HeaderGroup, flexRender } from "@tanstack/react-table"
import { PropsWithChildren } from "react"
import DataTableFilter from "./DataTableFilter"
import { DataTableColumnDef } from "./DataTable"

export interface DataTableHeaderProps<T> extends PropsWithChildren {
    headerGroup: HeaderGroup<T>
    columnDefs:DataTableColumnDef<T>[]
    onFilter?: ()=>Promise<any>

}

export default function DataTableHeader<T>(props: DataTableHeaderProps<T>) {
    const getColumnDef = (id: string) => props.columnDefs.find(c => c.id == id)

    return <tr key={props.headerGroup.id}>
        {props.headerGroup.headers.map(header => (
            <th key={header.id}
                colSpan={header.colSpan}
                style={{ width: `${header.getSize()}%` }}
            >
                <div>
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    {props.onFilter && <DataTableFilter
                        column={header.column}
                        columnDef={getColumnDef(header.id)!}
                        onFilter={props.onFilter}
                    />}
                </div>
            </th>
        ))}
    </tr>
}