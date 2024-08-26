import uris from "src/configs/uris"
import { Worker } from "../types"

export const getListIdWorkerAxios = async (): Promise<string[]> => {
    const endpoint = uris.genesys

    const headers = {
        "content-type": "application/json",
    }
    const graphqlQuery = {
        operationName: "getAllIdWorker",
        query: `query getAllIdWorker {
            getAllIdWorker
        }`,
    }

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(graphqlQuery),
    }

    const response = await fetch(endpoint, options)
    const { data } = await response.json()

    return data?.getAllIdWorker ?? []
}

export const getDataWorkerByIdAxios = async (id: string): Promise<Worker | null> => {
    const endpoint = uris.genesys

    const headers = {
        "content-type": "application/json",
    }
    const graphqlQuery = {
        query: `
    query getDataWorkerById($id: UUID!){
        getDataWorkerById(id: $id){
            id
            firstName
            lastName
            typeDni
            idnDni
            phone
            address
            numberWorker
            codeQr
            gender
            email
            condition
            active
            Attendance {
                id
                in
                out
                hourWork
                day
            }
        }
    }
`,
        variables: { id: id },
    }

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(graphqlQuery),
    }

    const response = await fetch(endpoint, options)

    const { data, error } = await response.json()

    return data?.getDataWorkerById ?? null
}
