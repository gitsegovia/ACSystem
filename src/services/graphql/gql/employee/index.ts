import { gql } from "@apollo/client"

export const QUERYS = {
    getAllEmployee: gql`
        query getAllEmployee($search: SearchEmployeeInp!) {
            getAllEmployee(search: $search) {
                infoPage {
                    count
                }
                results {
                    id
                    firstName
                    lastName
                    idnDni
                    gender
                    phone
                    position
                    role
                    active
                    User {
                        id
                        email
                    }
                }
            }
        }
    `,
    getAllIdEmployee: gql`
        query getAllIdEmployee {
            getAllIdEmployee
        }
    `,
    getDataEmployeeById: gql`
        query getDataEmployeeById($id: UUID!) {
            getDataEmployeeById(id: $id) {
                id
                firstName
                lastName
                idnDni
                gender
                phone
                position
                role
                active
                User {
                    email
                }
            }
        }
    `,
}
export const MUTATIONS = {
    createEmployee: gql`
        mutation createEmployee($input: CreateEmployeeInp!) {
            createEmployee(input: $input)
        }
    `,
    deleteEmployeeById: gql`
        mutation deleteEmployeeById($id: UUID!) {
            deleteEmployeeById(id: $id)
        }
    `,
}
