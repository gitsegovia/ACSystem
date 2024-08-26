// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next/types"

// ** Demo Components Imports
import UserViewPage from "src/views/apps/teacher/view/UserViewPage"
import { getDataTeacherByIdAxios, getListIdTeacherAxios } from "src/services/graphql/axios/teacher"

const UserView = ({ tab, infoTeacher }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <UserViewPage tab={tab} infoTeacher={infoTeacher} />
}

export const getStaticPaths: GetStaticPaths = async () => {
    const listId = await getListIdTeacherAxios()

    return {
        paths: listId.map((id) => {
            return {
                params: {
                    tab: "overview",
                    id: id,
                },
            }
        }),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    //   const res = await axios.get('/apps/invoice/invoices')
    const idTeacher = params ? (params.id as string) : ""
    const infoTeacher = await getDataTeacherByIdAxios(idTeacher)

    return {
        props: {
            infoTeacher,
            tab: params?.tab,
        },
    }
}

export default UserView
