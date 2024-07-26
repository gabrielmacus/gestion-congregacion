import AdminLayout from "../layouts/AdminLayout";
import usePublisherApi, { Publisher } from "./usePublisherApi";
import DataTable, { DataTableColumnDef, DataTableRef } from "../data-table/DataTable";
import { useTranslation } from "react-i18next";
import { Query } from "../requests/useApi";
import DataTableColumnActions from "../data-table/DataTableColumnActions";
import { useNavigate } from "react-router";
import useConfirmDialog from "../modal/useConfirmDialog";
import { useRef } from "react";

export default function PublisherList() {
    const api = usePublisherApi()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { confirm } = useConfirmDialog()
    const table = useRef<DataTableRef>(undefined!)

    const columns: DataTableColumnDef<Publisher>[] = [
        {
            header: "Id",
            accessorKey: "Id",
            id: "id",
            size:10,
            meta: {
                columnFilter: (value) => [`Id eq ${value}`],
                filterType: 'number',
            }

        },
        {
            header: t("publisher.table.surname"),
            accessorKey: "Surname",
            id: "surname",
            size: 40,
            meta: {
                columnFilter: (value) => [`contains(Surname,'${value}')`],
                filterType: 'text'
            }
        },
        {
            header: t("publisher.table.name"),
            accessorKey: "Name",
            id: "name",
            size:40,
            meta: {
                columnFilter: (value) => [`contains(Name,'${value}')`],
                filterType: 'text'
            },

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
        />
    </AdminLayout>
}