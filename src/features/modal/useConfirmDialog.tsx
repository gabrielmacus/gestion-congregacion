import { useTranslation } from "react-i18next";
import useModalContext from "./useModalContext";

export default function useConfirmDialog() {
    const context = useModalContext()
    const { t } = useTranslation()
    
    
    return {
        async confirm(
            onConfirm: (...args: any[]) => any,
            afterConfirm?:()=>any,
            afterCancel?:()=>any,
            message?: string) 
        {
            
            const result = await context.modal.confirm({
                title: t("confirm.title"),
                content: message,
                onOk: onConfirm,
                okText: t("confirm.ok"),
                cancelText: t("confirm.cancel")
            })
            if(result) await afterConfirm?.()
            else await afterCancel?.()
        }
    }
}