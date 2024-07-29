import { CellContext } from "@tanstack/react-table"
import { useTranslation } from "react-i18next"
import Button from "../form/Button"
import { Popover, PopoverButton } from "@headlessui/react"
import PopoverPanel from "../modal/PopoverPanel"

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
        <Popover  >
            <PopoverButton as="div">
                <Button>{t("table.actions")}</Button>
            </PopoverButton>
            <PopoverPanel className={"grid gap-1"} anchor={{
                to: "bottom end",
                gap:5
            }}>
                {props.actions.map((action, index) =>
                    <Button
                        style={{ width: "100%", minWidth: "120px" }}
                        key={index}
                        onClick={() => action.fn(props.cellContext.row.original)}>{action.label}</Button>
                )}
            </PopoverPanel>
        </Popover>
    )
}