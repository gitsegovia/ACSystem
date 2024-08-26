import uris from "src/configs/uris"
import { Administrative } from "../types"

export const getListIdAdministrativeAxios = async (): Promise<string[]> => {
    const endpoint = uris.genesys

    const headers = {
        "content-type": "application/json",
    }
    const graphqlQuery = {
        operationName: "getAllIdAdministrative",
        query: `query getAllIdAdministrative {
            getAllIdAdministrative
        }`,
    }

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(graphqlQuery),
    }

    const response = await fetch(endpoint, options)
    const { data } = await response.json()

    return data?.getAllIdAdministrative ?? []
}

export const getDataAdministrativeByIdAxios = async (id: string): Promise<Administrative | null> => {
    const endpoint = uris.genesys

    const headers = {
        "content-type": "application/json",
    }
    const graphqlQuery = {
        query: `
    query getDataAdministrativeById($id: UUID!){
        getDataAdministrativeById(id: $id){
            id
            firstName
            lastName
            typeDni
            idnDni
            phone
            address
            numberAdministrative
            codeQr
            gender
            email
            position
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

    return data?.getDataAdministrativeById ?? null
}
