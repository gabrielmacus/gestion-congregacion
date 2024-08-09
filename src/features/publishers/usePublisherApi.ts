import useApi, { BaseModel } from "../core/requests/useApi";

export interface Publisher extends BaseModel {
    Name:string
    Surname:string
}

export default function usePublisherApi() {
    const api = useApi<Publisher>({
        endpoint: "Publisher"
    })

    return {
        ...api
    }

}