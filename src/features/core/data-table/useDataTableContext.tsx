import { Table } from '@tanstack/react-table';
import  { createContext, useContext } from 'react';

interface DataTableContextProps {
    loadData: ()=>Promise<any>
    table:Table<any>
}

export const DataTableContext = createContext<DataTableContextProps | undefined>(undefined)

export function useDataTableContext() {
    const context = useContext(DataTableContext)
    if (!context) {
        throw new Error('useDataTableContext must be used within a DataTableProvider')
    }
    return context
}
