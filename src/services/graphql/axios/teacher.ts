import uris from "src/configs/uris"
import { Teacher } from "../types"

export const getListIdTeacherAxios = async (): Promise<string[]> => {
    const endpoint = uris.genesys

    const headers = {
        "content-type": "application/json",
    }
    const graphqlQuery = {
        operationName: "getAllIdTeacher",
        query: `query getAllIdTeacher {
            getAllIdTeacher
        }`,
    }

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(graphqlQuery),
    }

    const response = await fetch(endpoint, options)
    const { data } = await response.json()

    return data?.getAllIdTeacher ?? []
}

export const getDataTeacherByIdAxios = async (id: string): Promise<Teacher | null> => {
    const endpoint = uris.genesys

    const headers = {
        "content-type": "application/json",
    }
    const graphqlQuery = {
        query: `
    query getDataTeacherById($id: UUID!){
        getDataTeacherById(id: $id){
            id
            firstName
            lastName
            typeDni
            idnDni
            phone
            address
            numberTeacher
            codeQr
            gender
            email
            condition
            scale
            dedication
            department
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

    return data?.getDataTeacherById ?? null
}
