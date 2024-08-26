import { gql } from "@apollo/client"

export const QUERYS = {
    getAllAttendance: gql`
        query getAllAttendance($search: SearchAttendanceInp!) {
            getAllAttendance(search: $search) {
                results {
                    id
                    day
                    in
                    out
                    Teacher {
                        firstName
                        lastName
                    }
                    Worker {
                        firstName
                        lastName
                    }
                    Administrative {
                        firstName
                        lastName
                    }
                }
            }
        }
    `,
    getAttendanceToDay: gql`
        query getAttendanceToDay {
            getAttendanceToDay {
                id
                day
                in
                out
                Teacher {
                    firstName
                    lastName
                }
                Worker {
                    firstName
                    lastName
                }
                Administrative {
                    firstName
                    lastName
                }
            }
        }
    `,
    getAttendanceToWeek: gql`
        query getAttendanceToWeek {
            getAttendanceToWeek {
                id
                day
                in
                out
                Teacher {
                    firstName
                    lastName
                }
                Worker {
                    firstName
                    lastName
                }
                Administrative {
                    firstName
                    lastName
                }
            }
        }
    `,
}
export const MUTATIONS = {}
