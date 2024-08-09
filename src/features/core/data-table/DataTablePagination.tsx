import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid"
import ReactPaginate from "react-paginate"

export interface DataTablePaginationProps {
    pageCount: number
    pageRangeDisplayed?: number
    marginPagesDisplayed?: number
    onPageChange: (pageNumber: number) => void
    loading?:boolean
}
export default function DataTablePagination(props: DataTablePaginationProps) {

    return <ReactPaginate
        className="flex font-semibold "
        pageCount={props.pageCount}
        pageRangeDisplayed={props.pageRangeDisplayed}
        marginPagesDisplayed={props.marginPagesDisplayed}
        onPageChange={(p) => props.onPageChange(p.selected)}
        containerClassName="pagination select-none"
        pageLinkClassName=" select-none px-1 border-black border-solid  hover:border-b-2 hover:border-gray-500"
        activeLinkClassName="border-b-2 border-black text-black "
        disabledClassName="text-gray-300"
        nextClassName="next"


        previousLabel={<ChevronLeftIcon className="w-5" />}
        nextLabel={<ChevronRightIcon className="w-5" />}
    />
}