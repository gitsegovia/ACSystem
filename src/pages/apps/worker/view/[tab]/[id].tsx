// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next/types"

// ** Demo Components Imports
import UserViewPage from "src/views/apps/worker/view/UserViewPage"
import { getDataWorkerByIdAxios, getListIdWorkerAxios } from "src/services/graphql/axios/worker"

const UserView = ({ tab, infoWorker }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <UserViewPage tab={tab} infoWorker={infoWorker} />
}

export const getStaticPaths: GetStaticPaths = async () => {
    const listId = await getListIdWorkerAxios()

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
    const idWorker = params ? (params.id as string) : ""
    const infoWorker = await getDataWorkerByIdAxios(idWorker)

    return {
        props: {
            infoWorker,
            tab: params?.tab,
        },
    }
}

export default UserView
