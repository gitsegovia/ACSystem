// ** MUI Imports
import Grid from "@mui/material/Grid"
import { Administrative, Attendance, Teacher, Worker } from "src/services/graphql/types"

// ** Demo Components Imports
import UserViewLeft from "src/views/apps/teacher/markAttendance/UserViewLeft"
import UserViewRight from "src/views/apps/teacher/markAttendance/UserViewRight"

type Props = {
    attendanceData: Attendance
    infoPersonal: Teacher | Worker | Administrative
}

const UserViewMarkAttendance = ({ attendanceData, infoPersonal }: Props) => {
    return (
        <Grid container spacing={6} sx={{ paddingX: "5rem" }}>
            <Grid item xs={12} md={5} lg={4}>
                <UserViewLeft infoPersonal={infoPersonal} />
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
                <UserViewRight data={attendanceData} type={infoPersonal.__typename?.toString() ?? "Teacher"} />
            </Grid>
        </Grid>
    )
}

export default UserViewMarkAttendance
