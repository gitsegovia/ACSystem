import { ApolloClient, useApolloClient, useLazyQuery, useMutation, ApolloError } from "@apollo/client"
import { TeacherListIdResult } from "src/services/graphql/hooks/teacher/types"
import { QUERYS } from "src/services/graphql/gql/teacher"

type LazyQueryResult<TData, TVariables = {}> = {
    loading: boolean
    data: TData | null
    error: ApolloError | null
    called: boolean
    fetchMore: (fetchMoreOptions?: { variables?: Partial<TVariables>; updateQuery: (previousQueryResult: TData, options: { fetchMoreResult: TData; variables: TVariables }) => TData }) => Promise<any>
}

type MutationResult<TData> = {
    loading: boolean
    data: TData | null
    error: ApolloError | null
    called: boolean
}

type ListIdResult<TData> = {
    getAllIdTeacher: TData
}

class DataQueryTeacher {
    private apolloClient: ApolloClient<object>

    constructor(apolloClient: ApolloClient<object>) {
        this.apolloClient = apolloClient
    }

    static getInstance(): DataQueryTeacher {
        const apolloClient = useApolloClient()
        return new DataQueryTeacher(apolloClient)
    }

    useLazyListIdTeacher = (): (() => Promise<MutationResult<string[]>>) => {
        const query = QUERYS.getAllIdTeacher

        const [getListIdQuery, mutationResult] = useLazyQuery<ListIdResult<string[]>>(query, { client: this.apolloClient })

        return async (): Promise<MutationResult<string[]>> => {
            try {
                const { data, error } = await getListIdQuery()
                console.log("PASO POR ACA", data)
                return {
                    ...mutationResult,
                    ...error,
                    data: data?.getAllIdTeacher,
                } as MutationResult<string[]>
            } catch (error) {
                if (error instanceof ApolloError) {
                    // Verificamos si el error es de tipo ApolloError
                    return {
                        ...mutationResult,
                        error,
                        data: null,
                    } as MutationResult<string[]>
                } else {
                    return {
                        ...mutationResult,
                        error: null,
                        data: null,
                    } as MutationResult<string[]>
                }
            }
        }
    }
}

export default DataQueryTeacher
