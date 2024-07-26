import { CellContext } from "@tanstack/react-table"
import { Button, Popover, Space } from "antd"
import { useTranslation } from "react-i18next"

export interface ColumnAction<T> {
    label: string
    fn: (row: Partial<T>) => any | Promise<any>
    danger?: boolean
}


export interface DataTableColumnActionsProps<T> {
    cellContext: CellContext<T, any>
    actions: ColumnAction<T>[]
}

export default function DataTableColumnActions<T>(props: DataTableColumnActionsProps<T>) {
    const { t } = useTranslation()

    return (
        <Popover placement="bottomRight" trigger={"click"} content={<Space direction="vertical" >
            {props.actions.map((action, index) =>
                <Button
                    style={{ width: "100%", minWidth: "120px" }}
                    key={index}
                    danger={action.danger}
                    onClick={() => action.fn(props.cellContext.row.original)}>{action.label}</Button>
            )}
        </Space>}>
            <Button>{t("table.actions")}</Button>
        </Popover>
    )
}