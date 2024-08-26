import { gql } from "@apollo/client"

export const QUERYS = {
    getAllAdministrative: gql`
        query getAllAdministrative($search: SearchAdministrativeInp!) {
            getAllAdministrative(search: $search) {
                infoPage {
                    count
                }
                results {
                    id
                    firstName
                    lastName
                    typeDni
                    idnDni
                    phone
                    address
                    numberAdministrative
                    codeQr
                    gender
                    email
                    position
                    active
                }
            }
        }
    `,
    getAllIdAdministrative: gql`
        query getAllIdAdministrative {
            getAllIdAdministrative
        }
    `,
    getDataAdministrativeById: gql`
        query getDataAdministrativeById($id: UUID!) {
            getDataAdministrativeById(id: $id) {
                id
                firstName
                lastName
                typeDni
                idnDni
                phone
                address
                position
                numberAdministrative
                codeQr
                gender
                email
                position
                scale
                dedication
                active
            }
        }
    `,
}
export const MUTATIONS = {
    createAdministrative: gql`
        mutation createAdministrative($input: CreateAdministrativeInp!) {
            createAdministrative(input: $input)
        }
    `,
    markAttendanceAdministrative: gql`
        mutation markAttendanceAdministrative($input: MarkAttendanceInput!) {
            markAttendanceAdministrative(input: $input) {
                in
                out
                day
                Administrative {
                    id
                    firstName
                    lastName
                    typeDni
                    idnDni
                    phone
                    address
                    numberAdministrative
                    codeQr
                    gender
                    email
                    position
                    active
                }
            }
        }
    `,
    deleteAdministrativeById: gql`
        mutation deleteAdministrativeById($id: UUID!) {
            deleteAdministrativeById(id: $id)
        }
    `,
    disableAdministrativeById: gql`
        mutation disableAdministrativeById($id: UUID!) {
            disableAdministrativeById(id: $id)
        }
    `,
}
