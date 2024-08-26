// ** React Import
import { useState, useEffect } from "react"

// ** Types Import
import { MeInput, LoginInput, MeResult } from "./types"

// ** Other Import
import { getGraphQlError } from "../../errorGraphql"

// ** gql Import
import { MUTATIONS } from "../../gql/login"
import { SystemConnect } from "../../types"

export async function useLazyLogin(apollo: any): Promise<MeResult> {
    try {
        if (apollo.mutate) {
            const { email, password } = apollo.values
            const input: LoginInput = {
                email,
                password,
                systemConnect: SystemConnect.Web,
            }

            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.loginEmployee,
                variables: { input: input },
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            })

            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.loginEmployee || undefined,
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

export async function useLazyMe(apollo: any): Promise<MeResult> {
    try {
        if (apollo.mutate) {
            const { token, onTokenExpiration } = apollo.values
            const input: MeInput = {
                token,
                onTokenExpiration,
            }
            const { data, errors } = await apollo.mutate({
                mutation: MUTATIONS.me,
                variables: input,
                errorPolicy: "all",
            })
            return {
                loading: false,
                error: errors && errors.length > 0 ? getGraphQlError(errors[0].message) : "",
                data: data?.me || undefined,
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

export type { MeResult }
