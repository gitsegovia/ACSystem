// ** Types Import
import { CreateAdministrativeInp, SearchAdministrativeInp, AdministrativeListIdResult, AdministrativeResult, AdministrativesResult, MarkAttendanceInput, Attendance } from "./types"

// ** Other Import
import { getGraphQlError } from "../../errorGraphql"

// ** gql Import
import { MUTATIONS } from "../../gql/administrative"
import { QUERYS } from "../../gql/administrative"
import { Result } from "../../customType"

export async function useLazyGetAllAdministrative(apollo: any): Promise<AdministrativesResult> {
    try {
        if (apollo.query) {
            const search: SearchAdministrativeInp = {
                options: null,
            }

            const { data, error } = await apollo.query({
                query: QUERYS.getAllAdministrative,
                variables: { search: search },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getAllAdministrative || undefined,
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

export async function useLazyGetDataAdministrativeById(apollo: any): Promise<AdministrativeResult> {
    try {
        if (apollo.query) {
            const { id } = apollo.values

            const { data, error } = await apollo.query({
                query: QUERYS.getDataAdministrativeById,
                variables: { id: id },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getDataAdministrativeById || undefined,
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

export async function useLazyGetAllIdAdministrative(apollo: any): Promise<AdministrativeListIdResult> {
    try {
        if (apollo.query) {
            const { data, error } = await apollo.query({
                query: QUERYS.getAllIdAdministrative,
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getAllIdAdministrative || undefined,
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

export async function useLazyCreateAdministrative(apollo: any): Promise<Result<Boolean>> {
    try {
        if (apollo.mutate) {
            const { firstName, lastName, idnDni, phone, address, position, gender, email, id } = apollo.values

            const input: CreateAdministrativeInp = {
                firstName,
                lastName,
                idnDni,
                phone,
                address,
                position,
                gender,
                email,
            }

            if (id) {
                input.id = id
            }

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.createAdministrative,
                variables: { input: input },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.createAdministrative || undefined,
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

export async function useLazyMarkAttendanceAdministrative(apollo: any): Promise<Result<Attendance>> {
    try {
        if (apollo.mutate) {
            const { codeQr, typeMark } = apollo.values

            const input: MarkAttendanceInput = {
                codeQr,
                typeMark,
            }

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.markAttendanceAdministrative,
                variables: { input: input },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.markAttendanceAdministrative || undefined,
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

export async function useLazyDeleteAdministrativeById(apollo: any): Promise<Result<Boolean>> {
    try {
        if (apollo.mutate) {
            const { id } = apollo.values

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.deleteAdministrativeById,
                variables: { id: id },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.deleteAdministrativeById || undefined,
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

export async function useLazyDisableAdministrativeById(apollo: any): Promise<Result<Boolean>> {
    try {
        if (apollo.mutate) {
            const { id } = apollo.values

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.disableAdministrativeById,
                variables: { id: id },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.disableAdministrativeById || undefined,
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

export type { AdministrativeResult, AdministrativesResult }
