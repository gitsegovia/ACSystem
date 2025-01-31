// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next/types";

// ** Third Party Imports
import axios from "axios";

// ** Types
import { Attendance } from "src/services/graphql/types";

// ** Demo Components Imports
import UserViewPage from "src/views/apps/user/view/UserViewPage";

const UserView = ({ tab, attendanceData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <UserViewPage tab={tab} attendanceData={attendanceData} />;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { tab: "overview" } }, { params: { tab: "security" } }, { params: { tab: "billing-plan" } }, { params: { tab: "notification" } }, { params: { tab: "connection" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const attendanceData: Attendance[] = [];

  return {
    props: {
      attendanceData,
      tab: params?.tab,
    },
  };
};

export default UserView;
