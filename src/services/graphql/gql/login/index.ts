import { gql } from "@apollo/client"

export const QUERYS = {}
export const MUTATIONS = {
    loginEmployee: gql`
        mutation loginEmployee($input: LoginInput!) {
            loginEmployee(input: $input) {
                user {
                    id
                    email
                    phone
                    nameUser
                    Employee {
                        firstName
                        lastName
                        position
                        role
                        gender
                        photo
                        numberEmployee
                    }
                }
                token
            }
        }
    `,
    me: gql`
        mutation me($token: String!, $onTokenExpiration: String) {
            me(token: $token, onTokenExpiration: $onTokenExpiration) {
                user {
                    id
                    email
                    phone
                    nameUser
                    Employee {
                        firstName
                        lastName
                        position
                        role
                        gender
                        photo
                        numberEmployee
                    }
                }
                token
            }
        }
    `,
}
