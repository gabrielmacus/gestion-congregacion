import { useReactTable, getCoreRowModel, ColumnDef, ColumnFiltersState, Column } from "@tanstack/react-table"
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { ODataResponse, Query, RequestResult } from "../requests/useApi"
import useRequestHandler from "../requests/useRequestHandler"
import DataTablePagination from "./DataTablePagination"
import 'react-loading-skeleton/dist/skeleton.css'
import DataTableHeader from "./DataTableHeader"
import DataTableRow from "./DataTableRow"
import DataTableEmpty from "./DataTableEmpty"
import { DataTableContext } from "./useDataTableContext"
import Select, { SelectOption } from "../form/Select"
import { useTranslation } from "react-i18next"
import Button from "../form/Button"

export interface DataTableProps<T> {
    title?: string
    noDataMessage?: string
    onFetchData: (query?: Query) => Promise<RequestResult<ODataResponse<T[]>>>
    columnDefs: DataTableColumnDef<T>[]
    columnFilters?: ColumnFiltersState
    initialPagination: { pageIndex: number, pageSize: number }
    actions?: SelectOption<() => any>[]
}

export type DataTableColumnDef<T> = ColumnDef<T, { a: () => any }> & {
    meta?: {
        cellAlign?: 'left' | 'center' | 'right',
    },
    filter?: {
        element: (column: Column<T>) => React.ReactNode
        parse: (value: any) => string[]
    }
}

export interface DataTableRef {
    loadData: () => Promise<any>
}

function DataTable<T>(props: DataTableProps<T>, ref?: ForwardedRef<DataTableRef>) {

    const { t } = useTranslation()
    const { handleRequest } = useRequestHandler()
    const [data, setData] = useState<T[]>([])
    const [count, setCount] = useState<number>()
    const [loading, setLoading] = useState<boolean>()

    const [pagination, setPagination] = useState(props.initialPagination);

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(props.columnFilters ?? [])

    let initialized = false

    const loadFilters = () => {
        let $filter: string[] = []

        for (const filter of columnFilters) {
            const columnDef = props.columnDefs.find(c => c.id == filter.id)
            if (columnDef?.filter) {
                $filter = [...$filter, ...columnDef.filter.parse(JSON.parse(filter.value as string))]
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
    }, [pagination, columnFilters])

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
    const pageCount = table.getPageCount()

    useImperativeHandle(ref, () => ({
        loadData: () => loadData()
    }))

    return (<DataTableContext.Provider value={{ loadData, table }}>
        <div className="">
            <div className="overflow-hidden   rounded-lg shadow-lg">
                {props.title &&
                    <h3 className="text-lg px-6 py-3 text-white bg-gray-600 font-semibold" >
                        {props.title}
                    </h3>}
                <div className="max-h-[50vh] overflow-auto">
                    <table
                        className="w-full text-left text-xs  rtl:text-right text-black"
                    >
                        <thead className="z-10 sticky top-0 uppercase bg-gray-700   text-white">
                            {table.getHeaderGroups().map(headerGroup =>
                                <DataTableHeader
                                    key={headerGroup.id}
                                    headerGroup={headerGroup}
                                    columnDefs={props.columnDefs}
                                />)}
                        </thead>
                        <tbody className="bg-gray-100 ">
                            {loading === false ?
                                table.getRowModel().rows.map(row =>
                                    <DataTableRow
                                        key={row.id}
                                        columnDefs={props.columnDefs}
                                        row={row}
                                        loading={loading}
                                    />
                                )
                                :
                                [...Array(pagination.pageSize < 5 ? pagination.pageSize : 5).keys()]
                                    .map(i =>
                                        <DataTableRow
                                            key={i}
                                            columnDefs={props.columnDefs}
                                            loading={loading} />
                                    )
                            }
                            {loading === false && table.getRowModel().rows.length == 0 && <DataTableEmpty message={props.noDataMessage} />}
                        </tbody>
                    </table>

                </div>
                <div className="flex w-full text-sm gap-5 items-center px-2 h-12
            justify-between
        select-none  bg-gray-200 text-gray-500">
                    {pageCount > 0 && <DataTablePagination
                        loading={loading}
                        pageCount={pageCount}
                        onPageChange={(pageNumber) => table.setPageIndex(pageNumber)}
                    />}

                    <div className="flex gap-2">
                        {props.actions && props.actions.length > 1 &&
                            <Select
                                value={t("table.actions")}
                                onChange={(fn) => fn()}
                                options={props.actions} />}
                        {props.actions && props.actions.length == 1 &&
                            <Button onClick={props.actions[0].value}>{props.actions[0].label}</Button>}
                    </div>
                </div>
            </div>


        </div>
    </DataTableContext.Provider >)
}

export default forwardRef(DataTable) as
    <T>(props: DataTableProps<T> & { ref?: ForwardedRef<DataTableRef> }) =>
        ReturnType<typeof DataTable>;




