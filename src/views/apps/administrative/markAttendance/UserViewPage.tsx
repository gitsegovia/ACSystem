// ** MUI Imports
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Administrative, Attendance, Teacher, Worker } from "src/services/graphql/types";

// ** Demo Components Imports
import UserViewLeft from "src/views/apps/administrative/markAttendance/UserViewLeft";
import UserViewRight from "src/views/apps/administrative/markAttendance/UserViewRight";

type Props = {
  attendanceData: Attendance;
  infoPersonal: Teacher | Worker | Administrative;
  clearData: () => void;
};

const UserViewMarkAttendance = ({ attendanceData, infoPersonal, clearData }: Props) => {
  return (
    <Grid container spacing={6} sx={{ paddingX: "5rem" }}>
      <Grid item md={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={clearData}
          sx={{
            width: "50%",
            marginRight: "auto",
            marginLeft: "auto",
            marginBottom: "15px",
          }}
        >
          Aceptar
        </Button>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft infoPersonal={infoPersonal} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight data={attendanceData} type={infoPersonal.__typename?.toString() ?? "Teacher"} />
      </Grid>
    </Grid>
  );
};

export default UserViewMarkAttendance;
