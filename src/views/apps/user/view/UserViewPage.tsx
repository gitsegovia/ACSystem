// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types
import { Attendance } from "src/services/graphql/types";

// ** Demo Components Imports
import UserViewLeft from "src/views/apps/user/view/UserViewLeft";
import UserViewRight from "src/views/apps/user/view/UserViewRight";

type Props = {
  tab: string;
  attendanceData: Attendance[];
};

const UserView = ({ tab, attendanceData }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight tab={tab} attendanceData={attendanceData} />
      </Grid>
    </Grid>
  );
};

export default UserView;
