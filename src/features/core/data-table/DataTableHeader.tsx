import { HeaderGroup, flexRender } from "@tanstack/react-table"
import { PropsWithChildren } from "react"
import { DataTableColumnDef } from "./DataTable"

export interface DataTableHeaderProps<T> extends PropsWithChildren {
    headerGroup: HeaderGroup<T>
    columnDefs:DataTableColumnDef<T>[]
}

export default function DataTableHeader<T>(props: DataTableHeaderProps<T>) {
    const getColumnDef = (id: string) => props.columnDefs.find(c => c.id == id)

    return <tr key={props.headerGroup.id}>
        {props.headerGroup.headers.map(header => (
            <th key={header.id}
                className="px-6 py-4"
                colSpan={header.colSpan}
                style={{ width: `${header.getSize()}%` }}
            >
                <div className="flex gap-2 items-center">
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    
                    {getColumnDef(header.id)?.filter?.element(header.column)}
                    {/*props.onFilter && <DataTableFilter
                        column={header.column}
                        columnDef={getColumnDef(header.id)!}
                        onFilter={props.onFilter}
                    />*/}
                </div>
            </th>
        ))}
    </tr>
}