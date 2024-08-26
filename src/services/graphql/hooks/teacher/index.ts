// ** Types Import
import { CreateTeacherInp, SearchTeacherInp, TeacherListIdResult, TeacherResult, TeachersResult, MarkAttendanceInput, Attendance } from "./types"

// ** Other Import
import { getGraphQlError } from "../../errorGraphql"

// ** gql Import
import { MUTATIONS } from "../../gql/teacher"
import { QUERYS } from "../../gql/teacher"
import { Result } from "../../customType"

export async function useLazyGetAllTeacher(apollo: any): Promise<TeachersResult> {
    try {
        if (apollo.query) {
            const search: SearchTeacherInp = {
                options: null,
            }

            const { data, error } = await apollo.query({
                query: QUERYS.getAllTeacher,
                variables: { search: search },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getAllTeacher || undefined,
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

export async function useLazyGetDataTeacherById(apollo: any): Promise<TeacherResult> {
    try {
        if (apollo.query) {
            const { id } = apollo.values

            const { data, error } = await apollo.query({
                query: QUERYS.getDataTeacherById,
                variables: { id: id },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getDataTeacherById || undefined,
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

export async function useLazyGetAllIdTeacher(apollo: any): Promise<TeacherListIdResult> {
    try {
        if (apollo.query) {
            const { data, error } = await apollo.query({
                query: QUERYS.getAllIdTeacher,
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: error ? getGraphQlError(error.message) : "",
                data: data?.getAllIdTeacher || undefined,
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

export async function useLazyCreateTeacher(apollo: any): Promise<Result<Boolean>> {
    try {
        if (apollo.mutate) {
            const { firstName, lastName, idnDni, phone, address, gender, email, condition, scale, dedication, department, id } = apollo.values

            const input: CreateTeacherInp = {
                firstName,
                lastName,
                idnDni,
                phone,
                address,
                position: "",
                gender,
                email,
                condition,
                department,
                scale,
                dedication,
            }

            if (id) {
                input.id = id
            }

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.createTeacher,
                variables: { input: input },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.createTeacher || undefined,
            }
        }

        return {
            loading: false,
            error: "Error",
            data: undefined,
        }
    } catch (err) {
        return {
            loading: false,
            error: getGraphQlError(err),
            data: undefined,
        }
    }
}

export async function useLazyMarkAttendanceTeacher(apollo: any): Promise<Result<Attendance>> {
    try {
        if (apollo.mutate) {
            const { codeQr, typeMark } = apollo.values

            const input: MarkAttendanceInput = {
                codeQr,
                typeMark,
            }

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.markAttendanceTeacher,
                variables: { input: input },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.markAttendanceTeacher || undefined,
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

export async function useLazyDeleteTeacherById(apollo: any): Promise<Result<Boolean>> {
    try {
        if (apollo.mutate) {
            const { id } = apollo.values

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.deleteTeacherById,
                variables: { id: id },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.deleteTeacherById || undefined,
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

export async function useLazyDisableTeacherById(apollo: any): Promise<Result<Boolean>> {
    try {
        if (apollo.mutate) {
            const { id } = apollo.values

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.disableTeacherById,
                variables: { id: id },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.disableTeacherById || undefined,
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

export type { TeacherResult, TeachersResult }
