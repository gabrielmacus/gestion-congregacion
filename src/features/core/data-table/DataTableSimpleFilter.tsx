import { Column } from "@tanstack/react-table";
import DataTableFilter from "./DataTableFilter";
import Field from "../form/Field";
import Input from "../form/Input";
import { z } from "zod";
import { useTranslation } from "react-i18next";

export type DataTableSimpleFilterProps<TModel> = {
    label?: string
    placeholder?: string
    column: Column<TModel>
    options?: { value: string, label: string }[]
    type?: 'string' | 'number',
}

interface Filter {
    filter: string
}


export default function DataTableSimpleFilter<TModel>(props: DataTableSimpleFilterProps<TModel>) {
    const { t } = useTranslation()
    return <>
        <DataTableFilter<Filter, TModel>
            checkIsFiltered={v => v.filter != undefined && v.filter != ""}
            column={props.column}
        >
            {form => <>
                <form.Field

                    validators={{
                        onChange: props.type == 'number' ?
                            z.string().regex(/^\d+$/, t('validation.shouldBeNumber')).optional().or(z.literal('')) :
                            z.string().optional()
                    }}
                    name="filter"

                >
                    {field =>
                        <Field
                            field={field}
                            label={props.label}
                        >
                            {!props.options && <Input placeholder={props.placeholder} />}
                        </Field>
                    }
                </form.Field>

            </>}
        </DataTableFilter>

    </>

}