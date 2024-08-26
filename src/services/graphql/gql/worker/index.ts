import { gql } from "@apollo/client"

export const QUERYS = {
    getAllWorker: gql`
        query getAllWorker($search: SearchWorkerInp!) {
            getAllWorker(search: $search) {
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
                    numberWorker
                    codeQr
                    gender
                    email
                    condition
                    active
                }
            }
        }
    `,
    getAllIdWorker: gql`
        query getAllIdWorker {
            getAllIdWorker
        }
    `,
    getDataWorkerById: gql`
        query getDataWorkerById($id: UUID!) {
            getDataWorkerById(id: $id) {
                id
                firstName
                lastName
                typeDni
                idnDni
                phone
                address
                numberWorker
                codeQr
                gender
                email
                condition
                scale
                dedication
                active
            }
        }
    `,
}
export const MUTATIONS = {
    createWorker: gql`
        mutation createWorker($input: CreateWorkerInp!) {
            createWorker(input: $input)
        }
    `,
    markAttendanceWorker: gql`
        mutation markAttendanceWorker($input: MarkAttendanceInput!) {
            markAttendanceWorker(input: $input) {
                in
                out
                day
                Worker {
                    id
                    firstName
                    lastName
                    codeQr
                    email
                    active
                    condition
                }
            }
        }
    `,
    deleteWorkerById: gql`
        mutation deleteWorkerById($id: UUID!) {
            deleteWorkerById(id: $id)
        }
    `,
    disableWorkerById: gql`
        mutation disableWorkerById($id: UUID!) {
            disableWorkerById(id: $id)
        }
    `,
}
