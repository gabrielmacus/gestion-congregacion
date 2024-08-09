import { useTranslation } from "react-i18next";
import useModalContext from "./useModalContext";

export default function useConfirmDialog() {
    const context = useModalContext()
    const { t } = useTranslation()


    return {
        confirm(
            onConfirm: (...args: any[]) => any,
            afterConfirm?: () => any,
            afterCancel?: () => any,
            message?: string) {
            return new Promise((resolve, _) => {
                context.open({
                    title: t("confirm.title"),
                    content: message,
                    className: "sm:max-w-md",
                    okText: t("confirm.ok"),
                    cancelText: t("confirm.cancel"),
                    onCancel: async () => {
                        await afterCancel?.()
                        resolve(false)
                    },
                    onConfirm: async () => {
                        await onConfirm()
                        await afterConfirm?.()
                        resolve(true)
                    }
                })
            })
        }
    }
}