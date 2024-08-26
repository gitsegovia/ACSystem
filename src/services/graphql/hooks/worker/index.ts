// ** Types Import
import { CreateWorkerInp, SearchWorkerInp, WorkerListIdResult, WorkerResult, WorkersResult, MarkAttendanceInput, Attendance } from "./types"

// ** Other Import
import { getGraphQlError } from "../../errorGraphql"

// ** gql Import
import { MUTATIONS } from "../../gql/worker"
import { QUERYS } from "../../gql/worker"
import { Result } from "../../customType"

export async function useLazyGetAllWorker(apollo: any): Promise<WorkersResult> {
    try {
        if (apollo.query) {
            const search: SearchWorkerInp = {
                options: null,
            }

            const { data, error } = await apollo.query({
                query: QUERYS.getAllWorker,
                variables: { search: search },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getAllWorker || undefined,
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

export async function useLazyGetDataWorkerById(apollo: any): Promise<WorkerResult> {
    try {
        if (apollo.query) {
            const { id } = apollo.values

            const { data, error } = await apollo.query({
                query: QUERYS.getDataWorkerById,
                variables: { id: id },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getDataWorkerById || undefined,
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

export async function useLazyGetAllIdWorker(apollo: any): Promise<WorkerListIdResult> {
    try {
        if (apollo.query) {
            const { data, error } = await apollo.query({
                query: QUERYS.getAllIdWorker,
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getAllIdWorker || undefined,
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

export async function useLazyCreateWorker(apollo: any): Promise<Result<Boolean>> {
    try {
        if (apollo.mutate) {
            const { firstName, lastName, idnDni, phone, address, gender, email, condition, id } = apollo.values

            const input: CreateWorkerInp = {
                firstName,
                lastName,
                idnDni,
                phone,
                address,
                gender,
                email,
                condition,
            }

            if (id) {
                input.id = id
            }

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.createWorker,
                variables: { input: input },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.createWorker || undefined,
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

export async function useLazyMarkAttendanceWorker(apollo: any): Promise<Result<Attendance>> {
    try {
        if (apollo.mutate) {
            const { codeQr, typeMark } = apollo.values

            const input: MarkAttendanceInput = {
                codeQr,
                typeMark,
            }
            console.log("input", input)
            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.markAttendanceWorker,
                variables: { input: input },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })
            console.log("useLazy", data, errors)
            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.markAttendanceWorker || undefined,
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

export async function useLazyDeleteWorkerById(apollo: any): Promise<Result<Boolean>> {
    try {
        if (apollo.mutate) {
            const { id } = apollo.values

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.deleteWorkerById,
                variables: { id: id },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.deleteWorkerById || undefined,
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

export async function useLazyDisableWorkerById(apollo: any): Promise<Result<Boolean>> {
    try {
        if (apollo.mutate) {
            const { id } = apollo.values

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.disableWorkerById,
                variables: { id: id },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.disableWorkerById || undefined,
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

export type { WorkerResult, WorkersResult }
