import { Column } from "@tanstack/react-table";
import { Button, Form, Input, InputNumber, Popover, Select, Space } from "antd";
import styled from "styled-components";
import { DataTableColumnDef } from "./DataTable";
import { useState } from "react";
import { FilterFilled, FilterOutlined, SearchOutlined } from "@ant-design/icons";

const Container = styled.div``
const FilterToggle = styled.div`
cursor:pointer;
`

export interface DataTableFilterProps<T> {
    columnDef?: DataTableColumnDef<T>
    column: Column<T>
    onFilter: () => Promise<any>
}

export default function DataTableFilter<T>(props: DataTableFilterProps<T>) {
    const type = props.columnDef?.meta?.filterType
    const [isFiltered, setIsFiltered] = useState(false)
    const value = props.column.getFilterValue() as any
    const [loading, setLoading] = useState(false)

    const onFilter = async () => {
        setLoading(true)
        setIsFiltered(props.column.getIsFiltered())
        await props.onFilter()
        setLoading(false)
    }

    return !type ? undefined :
        <Container>
            <Popover
                trigger={"click"}
                content={<Form
                >
                    {type == 'text' &&
                        <Space>
                            <Input
                                disabled={loading}
                                onChange={(evt) => props.column.setFilterValue(evt.target.value)}
                                value={value}
                                allowClear
                            />
                            <Button htmlType="submit" onClick={onFilter} loading={loading} icon={<SearchOutlined />} />
                        </Space>}
                    {type == 'number' &&
                        <Space>
                            <InputNumber
                                disabled={loading}
                                onChange={(evt) => props.column.setFilterValue(evt?.toString())}
                                value={value}
                            />
                            <Button htmlType="submit" onClick={onFilter} loading={loading} icon={<SearchOutlined />} />
                        </Space>
                    }
                    {type == 'select' &&
                        <Space>
                            <Select
                                allowClear
                                onChange={(val: any) => props.column.setFilterValue(val.toString())}
                                value={value}
                            >
                                {props.columnDef!.meta!.options!.map(o =>
                                    <Select.Option
                                        key={o.value}
                                        value={o.value}>{o.label}</Select.Option>)}
                            </Select>
                            <Button htmlType="submit" onClick={onFilter} loading={loading} icon={<SearchOutlined />} />
                        </Space>
                    }
                </Form>}
            >
                <FilterToggle>
                    {!isFiltered && <FilterOutlined />}
                    {isFiltered && <FilterFilled />}
                </FilterToggle>
            </Popover>

        </Container>

}