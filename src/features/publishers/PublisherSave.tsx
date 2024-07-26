import { Form, Input, } from "antd";
import { useTranslation } from "react-i18next";
import usePublisherApi from "./usePublisherApi";
import { useParams } from "react-router";
import DataForm from "../data-table/DataForm";

export default function PublisherSave() {
    const { id } = useParams()
    const { t } = useTranslation()
    const api = usePublisherApi()

    return <DataForm
        id={id}
        onGetById={api.readById}
        onCreate={api.create}
        onUpdate={api.update}
        notFoundPath="/admin/publicadores"
        successPath="/admin/publicadores"
    >
        <Form.Item
            hidden
            name={"Id"}
        >
            <Input />
        </Form.Item>
        <Form.Item
            required
            rules={[
                { required: true, message: t("validation.requiredField") },
                { max: 200, message: t("validation.maxLength", { length: 200 }) }
            ]}
            label={t("publisher.table.name")}
            name={"Name"}
        >
            <Input />
        </Form.Item>
        <Form.Item
            required
            rules={[
                { required: true, message: t("validation.requiredField") },
                { max: 200, message: t("validation.maxLength", { length: 200 }) }
            ]}
            label={t("publisher.table.surname")}
            name={"Surname"}
        >
            <Input />
        </Form.Item>
    </DataForm>

}
