// ** MUI Imports
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"

// ** Next Import
import Link from "next/link"

// ** Types
import { Teacher } from "src/services/graphql/types"

// ** Demo Components Imports
import UserViewLeft from "src/views/apps/teacher/view/UserViewLeft"
import UserViewRight from "src/views/apps/teacher/view/UserViewRight"

type Props = {
    tab: string
    infoTeacher: Teacher
}

// ** Styled <sup> component
const LinkStyled = styled(Link)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    marginBottom: theme.spacing(4),
}))

const UserView = ({ tab, infoTeacher }: Props) => {
    return (
        <>
            <Box>
                <LinkStyled href="/apps/teacher/list">
                    <Button variant="contained" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{`Regresar`}</Button>
                </LinkStyled>
            </Box>
            <Grid container spacing={6}>
                <Grid item xs={12} md={5} lg={4}>
                    <UserViewLeft infoTeacher={infoTeacher} />
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
                    <UserViewRight tab={tab} attendanceData={infoTeacher.Attendance ? infoTeacher.Attendance : []} />
                </Grid>
            </Grid>
        </>
    )
}

export default UserView
