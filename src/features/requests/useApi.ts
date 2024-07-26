import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { serialize } from "object-to-formdata";
import { useEffect, useRef } from "react";

export interface ApiProps {
    endpoint: string
}

export interface BaseModel {
    Id: number
    CreatedAt: Date
    UpdatedAt: Date
}

export interface Query {
    $count?: boolean
    $top?: number
    $skip?: number
    $expand?: string[]
    $orderby?: string[]
    $filter?: string[]
    $apply?: string[]
    $select?: string[]
}

export interface ODataResponse<T> {
    "@odata.count"?: number
    value: T
}

export interface RequestResult<T> {
    data?: T
    error?: Error | AxiosError
    errorMessage?: string
}
export type CreateOperation<T> = {
    create: (data: T, multipart?: boolean) => Promise<RequestResult<T>>
}

export interface ReadOperation<T> {
    read: (query?: Query, extraQs?: string[], path?: string) => Promise<RequestResult<ODataResponse<T[]>>>
    readById: (id: number, query?:Query) => Promise<RequestResult<T>>
}

export interface UpdateOperation<T> {
    update: (data: Partial<T>, id: number, multipart?: boolean, replace?: boolean) => Promise<RequestResult<void>>
}
export interface DeleteOperation {
    deleteById: (id: number) => Promise<RequestResult<void>>
}


export interface Api<T> extends CreateOperation<T>, ReadOperation<T>, UpdateOperation<T>, DeleteOperation {
    parseError: (error: any | AxiosError) => { error: any | AxiosError, errorMessage: string }
}

export default function useApi<T>(props: ApiProps): Api<T> {
    const axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}`,
        withCredentials: true
    })

    const queryToString = (query: Query) => {
        let qs: string[] = [];

        if (query.$count) {
            qs.push("$count=true");
        }
        if (query.$expand && query.$expand.length) {
            qs.push(`$expand=${query.$expand.join(",")}`);
        }
        if (query.$skip) {
            qs.push(`$skip=${query.$skip}`);
        }
        if (query.$top != undefined) {
            qs.push(`$top=${query.$top}`);
        }

        if (query.$orderby != undefined) {
            qs.push(`$orderby=${query.$orderby.join(",")}`);
        }
        /*
        if (!query.$orderby || query.$orderby.length == 0) {
            query.$orderby = ['Id asc'];
        }
        qs.push(`$orderby=${query.$orderby.join(",")}`)*/

        if (query.$filter && query.$filter.length > 0) {
            qs.push(`$filter=${query.$filter.join(" and ")}`);
        }

        if (query.$apply != undefined && query.$apply.length > 0) {
            qs.push(`$apply=${query.$apply.join("/")}`);
        }

        if (query.$select != undefined && query.$select.length > 0) {
            qs.push(`$select=${query.$select.join(",")}`)
        }

        return qs.join("&");
    };

    const parseError = (error: any | AxiosError) => {
        //TODO: Parse validation error
        if (axios.isAxiosError(error) && error.response && error.response?.status == 404)
            return { error, errorMessage: "error.404" }
        if (axios.isAxiosError(error) && error.response && error.response?.status == 400)
            return { error, errorMessage: "error.400" }
        if (axios.isAxiosError(error) && error.response && error.response?.status == 401)
            return { error, errorMessage: "error.401" }
        if (axios.isAxiosError(error) && error.response && error.response?.status == 500)
            return { error, errorMessage: "error.500" }
        if (axios.isAxiosError(error) && error.code == 'ERR_NETWORK')
            return { error, errorMessage: "error.network" }
        return { error, errorMessage: "error.unknown" }
    }

    return {
        parseError,
        async create(data: T, multipart?: boolean) {
            let dataToSend = multipart ? serialize(data, { indices: true }) : data
            const contentType = multipart ? 'multipart/form-data' : 'application/json'
            try {
                const response = await axiosInstance.post<ODataResponse<T>>(
                    `odata/${props.endpoint}`,
                    dataToSend,
                    {
                        headers: { 'Content-Type': contentType }
                    })
                return {
                    data: response.data.value
                };
            }
            catch (error: any | AxiosError) {
                console.error(error)
                return parseError(error)
            }
        },
        async read(query?: Query, extraQs?: string[], path?: string) {
            let qs = queryToString(query ?? {})
            if (extraQs && extraQs.length) {
                qs += `&${extraQs.join("&")}`
            }
            try {
                const url = path ? `odata/${props.endpoint}/${path}?${qs}` : `odata/${props.endpoint}?${qs}`
                const response = await axiosInstance.get<ODataResponse<T[]>>(url)
                return {
                    data: response.data
                };
            }
            catch (error: any | AxiosError) {
                console.error(error)
                return parseError(error)
            }
        },
        async readById(id: number, query?: Query) {
            const qs = queryToString(query ?? {})
            try {
                const url =  `odata/${props.endpoint}/${id}?${qs}`
                const response = await axiosInstance.get<T>(url)
                return {
                    data: response.data
                };
            }
            catch (error: any | AxiosError) {
                console.error(error)
                return parseError(error)
            }
        },
        async update(data: Partial<T>, id: number, multipart?: boolean, replace?: boolean) {
            let dataToSend = multipart ? serialize(data, { indices: true }) : data
            const contentType = multipart ? 'multipart/form-data' : 'application/json'
            try {
                await axiosInstance(
                    `odata/${props.endpoint}/${id}`,
                    {
                        data: dataToSend,
                        method: replace ? 'put' : 'patch',
                        headers: { 'Content-Type': contentType }
                    })
                return {};
            }
            catch (error: any | AxiosError) {
                console.error(error)
                return parseError(error)
            }
        },
        async deleteById(id: number) {
            try {
                await axiosInstance.delete(`odata/${props.endpoint}/${id}`)
                return {};
            }
            catch (error: any | AxiosError) {
                console.error(error)
                return parseError(error)
            }
        }
    }
}