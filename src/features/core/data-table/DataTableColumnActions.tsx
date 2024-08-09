import { CellContext } from "@tanstack/react-table"
import { useTranslation } from "react-i18next"
import Button from "../form/Button"
import Popover from "../modal/Popover"
import Select from "../form/Select"

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
        <Select
            className="w-28"
            value={t("table.actions")}
            options={props.actions.map(action => ({ label: action.label, value: action.fn }))}
            onChange={(fn) => fn(props.cellContext.row.original)}
        />
    
    )
}
    {/*<Popover trigger={<Button mode="text">{t("table.actions")}</Button>}>
            <ul className="">
                {props.actions.map((action, index) =>
                    <li
                        className="px-3 py-1.5 text-sm bg-white hover:bg-gray-200 cursor-pointer"
                        key={index}
                        onClick={() => action.fn(props.cellContext.row.original)}>
                        {action.label}
                    </li>
                )}
            </ul>
        </Popover>*/}
/*

 <Popover.Root>
            <Popover.Trigger asChild>
                <Button>{t("table.actions")}</Button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content sideOffset={5} className="overflow-hidden rounded-lg shadow-2xl"  >
                    <Popover.Arrow className="fill-white " height={6} width={12} />

                    <ul className="">
                        {props.actions.map((action, index) =>
                            <li
                                className="px-3 py-1.5 text-sm bg-white hover:bg-gray-200 cursor-pointer"
                                key={index}
                                onClick={() => action.fn(props.cellContext.row.original)}>
                                {action.label}
                            </li>
                        )}
                    </ul>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
<Popover  >
            <PopoverButton as="div">
                <Button>{t("table.actions")}</Button>
            </PopoverButton>
            <PopoverPanel className={"grid gap-1"} anchor={{
                to: "bottom end",
                gap: 5
            }}>
                {props.actions.map((action, index) =>
                    <Button
                        style={{ width: "100%", minWidth: "120px" }}
                        key={index}
                        onClick={() => action.fn(props.cellContext.row.original)}>{action.label}</Button>
                )}
            </PopoverPanel>
        </Popover>
*/