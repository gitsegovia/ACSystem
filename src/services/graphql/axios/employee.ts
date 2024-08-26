import uris from "src/configs/uris"
import { Employee } from "../types"

export const getListIdEmployeeAxios = async (): Promise<string[]> => {
    const endpoint = uris.genesys

    const headers = {
        "content-type": "application/json",
    }
    const graphqlQuery = {
        operationName: "getAllIdEmployee",
        query: `query getAllIdEmployee {
            getAllIdEmployee
        }`,
    }

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(graphqlQuery),
    }

    const response = await fetch(endpoint, options)
    const { data } = await response.json()

    return data?.getAllIdEmployee ?? []
}

export const getDataEmployeeByIdAxios = async (id: string): Promise<Employee | null> => {
    const endpoint = uris.genesys

    const headers = {
        "content-type": "application/json",
    }
    const graphqlQuery = {
        query: `
        query getDataEmployeeById($id: UUID!){
            getDataEmployeeById(id: $id){
                id
                firstName
                lastName
                idnDni
                gender
                phone
                position
                role
                active
                User {
                    email
                    password
                }
            }
        }`,
        variables: { id: id },
    }

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(graphqlQuery),
    }

    const response = await fetch(endpoint, options)

    const { data, error } = await response.json()

    return data?.getDataEmployeeById ?? null
}
