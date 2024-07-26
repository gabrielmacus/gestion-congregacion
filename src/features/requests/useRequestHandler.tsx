import { useTranslation } from "react-i18next"
import useNotificationsContext from "../notifications/useNotificationsContext"
import { RequestResult } from "./useApi"

export default function useRequestHandler() {
    const notificationCtx = useNotificationsContext()
    const { t } = useTranslation()

    async function handleRequest<T>(
        request: () => Promise<RequestResult<T | void>>
    ) {
        try {
            const result = await request()
            //if (axios.isAxiosError(result.error) && result.error.response && result.error.response.status == 401) redirectUnauthenticated()
            if (result.error) notificationCtx.api.error({ message: t(result.errorMessage!) })
            return result
        } catch (error) {
            console.error(error)
        }

    }

    return { handleRequest }

}