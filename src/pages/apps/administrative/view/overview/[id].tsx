// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next/types";

// ** Demo Components Imports
import UserViewPage from "src/views/apps/administrative/view/UserViewPage";
import { getDataAdministrativeByIdAxios, getListIdAdministrativeAxios } from "src/services/graphql/axios/administrative";

const UserView = ({ infoAdministrative }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <UserViewPage tab="overview" infoAdministrative={infoAdministrative} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getListIdAdministrativeAxios();

  // Crear un array de paths en el formato que Next.js necesita
  const paths = ids.map((id) => ({
    params: { id: id.toString() }, // Asegúrate de convertir el id a string si es numérico
  }));

  return {
    paths,
    fallback: "blocking", // o 'true', dependiendo de tus necesidades
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { id } = params as { id: string };
  const infoAdministrative = await getDataAdministrativeByIdAxios(id);

  if (!infoAdministrative) {
    return {
      notFound: true, // Retorna 404 si el usuario no existe
    };
  }

  return {
    props: { infoAdministrative },
  };
};

export default UserView;
