import Skeleton from "react-loading-skeleton"
import { DataTableColumnDef } from "./DataTable"
import { Row, flexRender } from "@tanstack/react-table"

/**
 * Props for the DataTableRow component.
 */
export type DataTableRowProps<T> = {
    loading?: boolean
    columnDefs: DataTableColumnDef<T>[]
    row?: Row<T>
}

/**
 * Renders a row in the data table.
 * @param props - The DataTableRowProps.
 * @returns The rendered DataTableRow component.
 */
export default function DataTableRow<T>(props: DataTableRowProps<T>) {
    /**
     * Retrieves the column definition for a given column ID.
     * @param id - The column ID.
     * @returns The column definition.
     */
    const getColumnDef = (id: string) => props.columnDefs.find(c => c.id == id)

    return props.loading ?
        <tr  >
            {props.columnDefs.map((_, i) =>
                <td key={i}>
                    <Skeleton />
                </td>)}
        </tr> :
        <tr key={props.row?.id}>
            {props.row?.getVisibleCells().map(cell => (
                <td key={cell.id} align={getColumnDef(cell.column.id)!.meta?.cellAlign}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
        </tr>
}