import { ChangeEvent, FormEvent, createContext, useContext } from 'react';

export interface FieldContextProps {
    value?:any
    onChange: (e: ChangeEvent<any>) => any
}
export const FieldContext = createContext<FieldContextProps>(undefined!)

// Custom hook to access the field context
export const useFieldContext = (): FieldContextProps => {
    const context = useContext(FieldContext);

    if (!context) {
        throw new Error('useFieldContext must be used within a FieldProvider');
    }

    return context;
};