// ** MUI Imports
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"

// ** Next Import
import Link from "next/link"

// ** Types
import { Worker } from "src/services/graphql/types"

// ** Demo Components Imports
import UserViewLeft from "src/views/apps/worker/view/UserViewLeft"
import UserViewRight from "src/views/apps/worker/view/UserViewRight"

type Props = {
    tab: string
    infoWorker: Worker
}

// ** Styled <sup> component
const LinkStyled = styled(Link)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    marginBottom: theme.spacing(4),
}))

const UserView = ({ tab, infoWorker }: Props) => {
    return (
        <>
            <Box>
                <LinkStyled href="/apps/worker/list">
                    <Button variant="contained" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{`Regresar`}</Button>
                </LinkStyled>
            </Box>
            <Grid container spacing={6}>
                <Grid item xs={12} md={5} lg={4}>
                    <UserViewLeft infoWorker={infoWorker} />
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
                    <UserViewRight tab={tab} attendanceData={infoWorker.Attendance ?? []} />
                </Grid>
            </Grid>
        </>
    )
}

export default UserView
