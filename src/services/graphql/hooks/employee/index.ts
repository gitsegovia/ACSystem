// ** Types Import
import { CreateEmployeeInp, SearchEmployeeInp, EmployeeListIdResult, EmployeeResult, EmployeesResult } from "./types"

// ** Other Import
import { getGraphQlError } from "../../errorGraphql"

// ** gql Import
import { MUTATIONS } from "../../gql/employee"
import { QUERYS } from "../../gql/employee"
import { Result } from "../../customType"

export async function useLazyGetAllEmployee(apollo: any): Promise<EmployeesResult> {
    try {
        if (apollo.query) {
            const search: SearchEmployeeInp = {
                options: null,
            }

            const { data, error } = await apollo.query({
                query: QUERYS.getAllEmployee,
                variables: { search: search },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getAllEmployee || undefined,
            }
        }

        return {
            loading: false,
            error: "Error",
            data: undefined,
        }
    } catch (err) {
        console.log(err)
        return {
            loading: false,
            error: getGraphQlError(err),
            data: undefined,
        }
    }
}

export async function useLazyGetDataEmployeeById(apollo: any): Promise<EmployeeResult> {
    try {
        if (apollo.query) {
            const { id } = apollo.values

            const { data, error } = await apollo.query({
                query: QUERYS.getDataEmployeeById,
                variables: { id: id },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getDataEmployeeById || undefined,
            }
        }

        return {
            loading: false,
            error: "Error",
            data: undefined,
        }
    } catch (err) {
        console.log(err)
        return {
            loading: false,
            error: getGraphQlError(err),
            data: undefined,
        }
    }
}

export async function useLazyGetAllIdEmployee(apollo: any): Promise<EmployeeListIdResult> {
    try {
        if (apollo.query) {
            const { data, error } = await apollo.query({
                query: QUERYS.getAllIdEmployee,
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getAllIdEmployee || undefined,
            }
        }

        return {
            loading: false,
            error: "Error",
            data: undefined,
        }
    } catch (err) {
        console.log(err)
        return {
            loading: false,
            error: getGraphQlError(err),
            data: undefined,
        }
    }
}

export async function useLazyCreateEmployee(apollo: any): Promise<Result<Boolean>> {
    try {
        if (apollo.mutate) {
            const { firstName, lastName, idnDni, phone, role, position, gender, email, password, id } = apollo.values

            const input: CreateEmployeeInp = {
                firstName,
                lastName,
                idnDni,
                gender,
                phone,
                position,
                role,
                password,
                email,
            }

            if (id) {
                input.id = id
            }

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.createEmployee,
                variables: { input: input },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.createEmployee || undefined,
            }
        }

        return {
            loading: false,
            error: "Error",
            data: undefined,
        }
    } catch (err) {
        console.log(err)
        return {
            loading: false,
            error: getGraphQlError(err),
            data: undefined,
        }
    }
}

export async function useLazyDeleteEmployeeById(apollo: any): Promise<Result<Boolean>> {
    try {
        if (apollo.mutate) {
            const { id } = apollo.values

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.deleteEmployeeById,
                variables: { id: id },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.deleteEmployeeById || undefined,
            }
        }

        return {
            loading: false,
            error: "Error",
            data: undefined,
        }
    } catch (err) {
        console.log(err)
        return {
            loading: false,
            error: getGraphQlError(err),
            data: undefined,
        }
    }
}

export type { EmployeeResult, EmployeesResult }
