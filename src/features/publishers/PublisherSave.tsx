import { useTranslation } from "react-i18next";
import usePublisherApi, { Publisher } from "./usePublisherApi";
import { useParams } from "react-router";
import DataForm from "../core/form/DataForm";
import AdminLayout from "../core/layouts/AdminLayout";
import Input from "../core/form/Input";
import Field from "../core/form/Field";
import { z } from 'zod'

export default function PublisherSave() {
    const { id } = useParams()
    const { t } = useTranslation()
    const api = usePublisherApi()

    return <AdminLayout>
        <DataForm<Publisher>
            id={id}
            onGetById={api.readById}
            onCreate={api.create}
            onUpdate={api.update}
            notFoundPath="/admin/publicadores"
            successPath="/admin/publicadores"
            defaultValues={{ Name: "", Surname: "" }}
        >
            {Form => <>
                <Form.Field name="Id">
                    {(field) => <Field hidden field={field}>
                        <Input />
                    </Field>}
                </Form.Field>
                <Form.Field
                    name="Name"
                    validators={{
                        onChange: z.string()
                            .min(1, t("validation.requiredField"))
                            .max(200, t("validation.maxLength", { length: 200 }))
                    }}
                >
                    {(field) => <Field required label={t("publisher.table.name")} field={field}>
                        <Input />
                    </Field>}
                </Form.Field>
                <Form.Field
                    name="Surname"
                    validators={{
                        onChange: z.string()
                            .min(1, t("validation.requiredField"))
                            .max(200, t("validation.maxLength", { length: 200 }))
                    }}
                >
                    {(field) => <Field required label={t("publisher.table.surname")} field={field}>
                        <Input />
                    </Field>}
                </Form.Field>
            </>}
        </DataForm>
    </AdminLayout>

}
