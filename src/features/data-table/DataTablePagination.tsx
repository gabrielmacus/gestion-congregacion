import ReactPaginate from "react-paginate"
import styled from "styled-components"
import { theme as antdTheme } from 'antd'
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"

interface StyledReactPaginateProps{
    color:string
    bg:string
    colorHover:string
    bgHover:string
    colorActive:string
    bgActive:string
    boxShadow:string
    borderRadius:number


}

const StyledReactPaginate = styled(ReactPaginate)<StyledReactPaginateProps>`
display: flex;
gap: 0.5rem;
padding:0.5rem;
list-style: none;
justify-content: center;
background-color: ${props => props.bg};
color: ${props => props.color};
box-shadow: ${props => props.boxShadow};
user-select: none;
margin:0;

&.loading{
    opacity:0.5;
    pointer-events:none;
}

& li:not(.disabled){
    cursor:pointer
}
& li.disabled, & li.prev + li.next {
    color: #ccc;
}
& a {
    font-weight:600;
    padding: 0.2rem 0.5rem;
    font-size:0.85rem;
    border-radius: ${props => props.borderRadius}px;
}

& li a:hover{
    background-color: ${props => props.bgHover};
    color: ${props => props.colorHover};
}
& li.active a{
    background-color: ${props => props.bgActive};
    color: ${props => props.colorActive};
}

`


export interface DataTablePaginationProps {
    pageCount: number
    pageRangeDisplayed?: number
    marginPagesDisplayed?: number
    onPageChange: (pageNumber: number) => void
    loading:boolean
}
export default function DataTablePagination(props: DataTablePaginationProps) {
    const { useToken } = antdTheme
    const { token: theme } = useToken()
    
    return <StyledReactPaginate
        boxShadow={theme.boxShadowTertiary}
        color={theme.colorPrimary}
        bg={theme.colorBgBase}
        
        className={props.loading ? 'loading' : ''}

        borderRadius={theme.borderRadiusSM}

        colorHover={theme.colorPrimaryHover}
        bgHover={theme.colorPrimaryBgHover}

        colorActive={theme.colorBgBase}
        bgActive={theme.colorPrimaryHover}

        pageCount={props.pageCount}
        pageRangeDisplayed={props.pageRangeDisplayed}
        marginPagesDisplayed={props.marginPagesDisplayed}
        onPageChange={(p) => props.onPageChange(p.selected)}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel={<CaretLeftOutlined />}
        nextLabel={<CaretRightOutlined />}
        previousClassName="prev"
        nextClassName="next"
        

    />
}