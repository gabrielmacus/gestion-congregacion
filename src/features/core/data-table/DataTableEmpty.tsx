import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { theme as antdTheme } from 'antd'

const StyledTr = styled.tr`
height: 100px;
width: 100%;
justify-content: center;
align-items: center;
vertical-align: ce;
text-align: center;
font-size: 1.25rem;
`

export interface DataTableEmptyProps {
    message?: string
}
//#9e9e9e
export default function DataTableEmpty(props: DataTableEmptyProps) {
    const { t } = useTranslation()
    return <StyledTr>
        <td colSpan={100}>
            {props.message ?? t("table.empty")}
        </td>
    </StyledTr>
}