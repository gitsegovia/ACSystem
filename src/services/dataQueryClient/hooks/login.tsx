import { ApolloClient, useApolloClient, useLazyQuery, useMutation, ApolloError } from "@apollo/client"
import { AuthPayLoad, MeInput } from "src/services/graphql/hooks/login/types"
import { MUTATIONS } from "src/services/graphql/gql/login"
import { LoginInput, SystemConnect } from "src/services/graphql/types"

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

type VarInput<TData> = {
    input: TData
}

type MEResult<TData> = {
    me: TData
}

class DataQueryLogin {
    private apolloClient: ApolloClient<object>

    constructor(apolloClient: ApolloClient<object>) {
        this.apolloClient = apolloClient
    }

    static getInstance(): DataQueryLogin {
        const apolloClient = useApolloClient()
        return new DataQueryLogin(apolloClient)
    }

    useLazyMe = (): ((input: MeInput) => Promise<MutationResult<AuthPayLoad>>) => {
        const query = MUTATIONS.me

        const [getMeQuery, mutationResult] = useMutation<MEResult<AuthPayLoad>, MeInput>(query, { client: this.apolloClient })

        return async (input: MeInput): Promise<MutationResult<AuthPayLoad>> => {
            try {
                const { data, errors } = await getMeQuery({
                    variables: input,
                })
                return {
                    ...mutationResult,
                    ...errors,
                    data: data?.me,
                } as MutationResult<AuthPayLoad>
            } catch (error) {
                if (error instanceof ApolloError) {
                    // Verificamos si el error es de tipo ApolloError
                    return {
                        ...mutationResult,
                        error,
                        data: null,
                    } as MutationResult<AuthPayLoad>
                } else {
                    return {
                        ...mutationResult,
                        error: null,
                        data: null,
                    } as MutationResult<AuthPayLoad>
                }
            }
        }
    }

    useLazyLogin = (): ((input: LoginInput) => Promise<MutationResult<AuthPayLoad>>) => {
        const query = MUTATIONS.loginEmployee

        const [getLoginEmployeeQuery, mutationResult] = useMutation<AuthPayLoad, VarInput<LoginInput>>(query, { client: this.apolloClient })

        return async (input: LoginInput): Promise<MutationResult<AuthPayLoad>> => {
            try {
                const result = await getLoginEmployeeQuery({
                    variables: {
                        input: {
                            email: input.email,
                            password: input.password,
                            systemConnect: SystemConnect.Web,
                        },
                    },
                    fetchPolicy: "no-cache",
                })

                return {
                    ...mutationResult,
                    ...result,
                } as MutationResult<AuthPayLoad>
            } catch (error) {
                if (error instanceof ApolloError) {
                    // Verificamos si el error es de tipo ApolloError
                    return {
                        ...mutationResult,
                        error,
                        data: null,
                    } as MutationResult<AuthPayLoad>
                } else {
                    return {
                        ...mutationResult,
                        error: null,
                        data: null,
                    } as MutationResult<AuthPayLoad>
                }
            }
        }
    }

    /**
     * Example useHooks
     * 
            useLazyMe = (): LazyQueryResult<AuthPayLoad, MeInput> => {
            const [getMeQuery, lazyQueryResult] = useLazyQuery<AuthPayLoad, MeInput>(
            MUTATIONS.me,
            {
                client: this.apolloClient,
            }
            );

            const useLazyMe = (token: string, onTokenExpiration: string) => {
            getMeQuery({
                variables: { token,onTokenExpiration },
            });
            };

            return { ...lazyQueryResult, useLazyMe } as LazyQueryResult<AuthPayLoad>;
        };
     */
}

export default DataQueryLogin
