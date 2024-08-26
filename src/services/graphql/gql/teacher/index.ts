import { gql } from "@apollo/client"

export const QUERYS = {
    getAllTeacher: gql`
        query getAllTeacher($search: SearchTeacherInp!) {
            getAllTeacher(search: $search) {
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
                    numberTeacher
                    codeQr
                    gender
                    email
                    condition
                    scale
                    dedication
                    department
                    active
                }
            }
        }
    `,
    getAllIdTeacher: gql`
        query getAllIdTeacher {
            getAllIdTeacher
        }
    `,
    getDataTeacherById: gql`
        query getDataTeacherById($id: UUID!) {
            getDataTeacherById(id: $id) {
                id
                firstName
                lastName
                typeDni
                idnDni
                phone
                address
                position
                numberTeacher
                codeQr
                gender
                email
                condition
                scale
                dedication
                department
                active
            }
        }
    `,
}
export const MUTATIONS = {
    createTeacher: gql`
        mutation createTeacher($input: CreateTeacherInp!) {
            createTeacher(input: $input)
        }
    `,
    markAttendanceTeacher: gql`
        mutation markAttendanceTeacher($input: MarkAttendanceInput!) {
            markAttendanceTeacher(input: $input) {
                in
                out
                day
                Teacher {
                    id
                    firstName
                    lastName
                    typeDni
                    idnDni
                    phone
                    address
                    numberTeacher
                    codeQr
                    gender
                    email
                    condition
                    scale
                    dedication
                    department
                    active
                }
            }
        }
    `,
    deleteTeacherById: gql`
        mutation deleteTeacherById($id: UUID!) {
            deleteTeacherById(id: $id)
        }
    `,
    disableTeacherById: gql`
        mutation disableTeacherById($id: UUID!) {
            disableTeacherById(id: $id)
        }
    `,
}
