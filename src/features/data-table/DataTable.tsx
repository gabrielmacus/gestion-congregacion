import { useReactTable, getCoreRowModel, ColumnDef, ColumnFiltersState, flexRender } from "@tanstack/react-table"
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react"
import styled from "styled-components"
import { ODataResponse, Query, RequestResult } from "../requests/useApi"
import useRequestHandler from "../requests/useRequestHandler"
import DataTablePagination from "./DataTablePagination"
import { theme as antdTheme } from 'antd'
import 'react-loading-skeleton/dist/skeleton.css'
import DataTableHeader from "./DataTableHeader"
import DataTableRow from "./DataTableRow"
import DataTableEmpty from "./DataTableEmpty"

const Container = styled.div``

interface StyledTableProps {
    color: string
    bgcolor: string
    bdcolor: string
}
const Title = styled.h3<{ bg: string }>`
background-color: ${props => props.bg};
color: black;
margin:0;
padding:12px 0px 0px 15px;
font-size:1.25rem;
`
const StyledTable = styled.table<StyledTableProps>`
width: 100%;
border-collapse: collapse;
font-size: 0.9em;
text-align: left;

thead tr {
    background: ${props => props.bgcolor};
    color:  ${props => props.color};
    text-align: left;
}
th, td {
    padding: 12px 15px;
}
th > div {
    display: flex;
    align-items: center;
    gap:1rem;
    width:100%;
}
tbody tr {
    //border-bottom: 1px solid #dddddd;
    background-color:white;
}
tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}
tbody tr:last-of-type {
    border-bottom: 2px solid ${props => props.bdcolor};
}
`

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
    const { useToken } = antdTheme
    const { token: theme } = useToken()

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

    return <Container>
        {props.title &&
            <Title bg={theme.colorPrimaryBg}>
                {props.title}
            </Title>}
        <StyledTable
            bgcolor={theme.colorPrimaryBg}
            color={theme.colorPrimaryText}
            bdcolor={theme.colorPrimary}
        >
            <thead>
                {table.getHeaderGroups().map(headerGroup =>
                    <DataTableHeader
                        key={headerGroup.id}
                        headerGroup={headerGroup}
                        columnDefs={props.columnDefs}
                        onFilter={loadData}
                    />)}
            </thead>
            <tbody>
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
        </StyledTable>

        <DataTablePagination
            loading={loading}
            pageCount={table.getPageCount()}
            onPageChange={(pageNumber) => table.setPageIndex(pageNumber)}
        />

    </Container >
}

export default forwardRef(DataTable) as
    <T>(props: DataTableProps<T> & { ref?: ForwardedRef<DataTableRef> }) =>
        ReturnType<typeof DataTable>;




