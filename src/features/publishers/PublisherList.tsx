import AdminLayout from "../core/layouts/AdminLayout";
import usePublisherApi, { Publisher } from "./usePublisherApi";
import DataTable, { DataTableColumnDef, DataTableRef } from "../core/data-table/DataTable";
import { useTranslation } from "react-i18next";
import { Query } from "../core/requests/useApi";
import DataTableColumnActions from "../core/data-table/DataTableColumnActions";
import { useNavigate } from "react-router";
import useConfirmDialog from "../core/modal/useConfirmDialog";
import { useRef } from "react";
import DataTableSimpleFilter from "../core/data-table/DataTableSimpleFilter";

const ADD_PATH = "/admin/publicadores/crear"
export default function PublisherList() {
    const api = usePublisherApi()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { confirm } = useConfirmDialog()
    const table = useRef<DataTableRef>(undefined!)

    const columns: DataTableColumnDef<Publisher>[] = [
        {
            header: t("table.id"),
            accessorKey: "Id",
            id: "id",
            size: 10,
            filter: {
                element: column =>
                    <DataTableSimpleFilter type="number" column={column} />,
                parse: (value) => value.filter ? [`Id eq ${value.filter}`] : []
            }
        },
        {
            header: t("publisher.table.surname"),
            accessorKey: "Surname",
            id: "surname",
            size: 40,
            filter: {
                element: column =>
                    <DataTableSimpleFilter column={column} />,
                parse: (value) => value.filter ? [`Contains(Surname, '${value.filter}')`] : []
            }
        },
        {
            header: t("publisher.table.name"),
            accessorKey: "Name",
            id: "name",
            size: 40,
            filter: {
                element: column =>
                    <DataTableSimpleFilter column={column} />,
                parse: (value) => value.filter ? [`Contains(Name, '${value.filter}')`] : []
            }
        },
        {
            header: "",
            id: "actions",
            size: 10,
            meta: { cellAlign: 'right' },
            cell: (ctx) => <DataTableColumnActions
                actions={[
                    { label: "Editar", fn: (row) => navigate(`/admin/publicadores/editar/${row.Id}`) },
                    {
                        label: "Eliminar",
                        fn: (row) => confirm(() => api.deleteById(row.Id!), table.current.loadData),
                        danger: true
                    }
                ]}
                cellContext={ctx}
            />,

        }
    ]

    return <AdminLayout>
        <DataTable<Publisher>
            ref={table}
            title={t("publisher.table.title")}
            initialPagination={{ pageIndex: 0, pageSize: 10 }}
            onFetchData={(query?: Query) => api.read({ ...{ $count: true }, ...query })}
            columnDefs={columns}
            noDataMessage={t("publisher.table.empty")}
            actions={[
                { label: t("publisher.add"), value: () => navigate(ADD_PATH) }
            ]}
        />
    </AdminLayout>
}