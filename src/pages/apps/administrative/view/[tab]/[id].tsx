// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next/types"

// ** Demo Components Imports
import UserViewPage from "src/views/apps/administrative/view/UserViewPage"
import { getDataAdministrativeByIdAxios, getListIdAdministrativeAxios } from "src/services/graphql/axios/administrative"

const UserView = ({ tab, infoAdministrative }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <UserViewPage tab={tab} infoAdministrative={infoAdministrative} />
}

export const getStaticPaths: GetStaticPaths = async () => {
    const listId = await getListIdAdministrativeAxios()

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
    const idAdministrative = params ? (params.id as string) : ""
    const infoAdministrative = await getDataAdministrativeByIdAxios(idAdministrative)

    return {
        props: {
            infoAdministrative,
            tab: params?.tab,
        },
    }
}

export default UserView
