import { useReactTable, getCoreRowModel, ColumnDef, ColumnFiltersState } from "@tanstack/react-table"
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { ODataResponse, Query, RequestResult } from "../requests/useApi"
import useRequestHandler from "../requests/useRequestHandler"
import DataTablePagination from "./DataTablePagination"
import 'react-loading-skeleton/dist/skeleton.css'
import DataTableHeader from "./DataTableHeader"
import DataTableRow from "./DataTableRow"
import DataTableEmpty from "./DataTableEmpty"

export interface DataTableProps<T> {
    title?: string
    noDataMessage?: string
    onFetchData: (query?: Query) => Promise<RequestResult<ODataResponse<T[]>>>
    columnDefs: DataTableColumnDef<T>[]
    columnFilters?: ColumnFiltersState
    initialPagination: { pageIndex: number, pageSize: number }
}

export type DataTableColumnDef<T> = ColumnDef<T> & {
    meta?: {
        cellAlign?: 'left' | 'center' | 'right',

        columnFilter?: (value: any) => string[]
        isFilterEmpty?: (value: any) => boolean
        filterType?: 'text' | 'number' | 'select',
        options?: { value: any, label: string }[]
    }
}

export interface DataTableRef {
    loadData: () => Promise<any>
}

function DataTable<T>(props: DataTableProps<T>, ref?: ForwardedRef<DataTableRef>) {


    const { handleRequest } = useRequestHandler()
    const [data, setData] = useState<T[]>([])
    const [count, setCount] = useState<number>()
    const [loading, setLoading] = useState(false)

    const [pagination, setPagination] = useState(props.initialPagination);

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(props.columnFilters ?? [])

    let initialized = false

    const loadFilters = () => {
        let $filter: string[] = []
        for (const filter of columnFilters) {
            const columnDef = props.columnDefs.find(c => c.id == filter.id)
            if (columnDef?.meta?.columnFilter) {
                $filter = [...$filter, ...columnDef.meta.columnFilter(filter.value)]
            }
        }
        return $filter
    }

    const loadData = async () => {
        setLoading(true)
        const result = await handleRequest(() => props.onFetchData({
            $top: pagination.pageSize,
            $skip: pagination.pageIndex * pagination.pageSize,
            $filter: loadFilters()
        }))

        if (result?.data) {
            setData(result.data.value)
            setCount(result.data["@odata.count"])
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!initialized) loadData()
        return () => {
            initialized = true
        }
    }, [pagination])

    const table = useReactTable<T>({
        data,
        columns: props.columnDefs,
        getCoreRowModel: getCoreRowModel(),

        manualPagination: true,
        rowCount: count,
        onPaginationChange: setPagination,

        manualFiltering: true,
        onColumnFiltersChange: setColumnFilters,

        state: {
            pagination,
            columnFilters
        }
    })

    useImperativeHandle(ref, () => ({
        loadData: () => loadData()
    }))

    return (<div className="rounded-lg overflow-hidden shadow-sm">

        {props.title &&
            <h3 className="text-xl px-6 py-3 text-white bg-gray-600 font-semibold" >
                {props.title}
            </h3>}
        <table
            className="w-full text-left text-xs  rtl:text-right text-black"
        >
            <thead className="uppercase bg-gray-700   text-white">
                {table.getHeaderGroups().map(headerGroup =>
                    <DataTableHeader
                        key={headerGroup.id}
                        headerGroup={headerGroup}
                        columnDefs={props.columnDefs}
                        onFilter={loadData}
                    />)}
            </thead>
            <tbody className="bg-gray-100 ">
                {!loading ?
                    table.getRowModel().rows.map(row =>
                        <DataTableRow
                            key={row.id}
                            columnDefs={props.columnDefs}
                            row={row}
                            loading={loading}
                        />
                    )
                    :
                    [...Array(pagination.pageSize).keys()].map(i =>
                        <DataTableRow
                            key={i}
                            columnDefs={props.columnDefs}
                            loading={loading} />
                    )
                }
                {!loading && table.getRowModel().rows.length == 0 && <DataTableEmpty message={props.noDataMessage} />}
            </tbody>
        </table>

        <DataTablePagination
            loading={loading}
            pageCount={table.getPageCount()}
            onPageChange={(pageNumber) => table.setPageIndex(pageNumber)}
        />
    </div>)
}

export default forwardRef(DataTable) as
    <T>(props: DataTableProps<T> & { ref?: ForwardedRef<DataTableRef> }) =>
        ReturnType<typeof DataTable>;




