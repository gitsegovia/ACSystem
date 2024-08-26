// ** MUI Imports
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"

// ** Custom Components
import CustomChip from "src/@core/components/mui/chip"
import CustomAvatar from "src/@core/components/mui/avatar"

// ** Types
import { ThemeColor } from "src/@core/layouts/types"
import { UsersType } from "src/types/apps/userTypes"

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials"
import { Administrative, Teacher, Worker } from "src/services/graphql/types"

interface ColorsType {
    [key: string]: ThemeColor
}

const data: UsersType = {
    id: 1,
    role: "admin",
    status: "active",
    username: "gslixby0",
    avatarColor: "primary",
    country: "El Salvador",
    company: "Yotz PVT LTD",
    contact: "(479) 232-9151",
    currentPlan: "enterprise",
    fullName: "Daisy Patterson",
    email: "gslixby0@abc.net.au",
    avatar: "/images/avatars/4.png",
}

const statusColors: ColorsType = {
    active: "success",
    pending: "warning",
    inactive: "secondary",
}

type Props = {
    infoPersonal: Teacher | Worker | Administrative
}

const UserViewLeft = ({ infoPersonal }: Props) => {
    let infoTeacher: Teacher | null = null
    let infoWorker: Worker | null = null
    let infoAdministrative: Administrative | null = null
    if (infoPersonal.__typename && infoPersonal.__typename === "Teacher") {
        infoTeacher = infoPersonal
    }
    if (infoPersonal.__typename && infoPersonal.__typename === "Worker") {
        infoWorker = infoPersonal
    }
    if (infoPersonal.__typename && infoPersonal.__typename === "Administrative") {
        infoAdministrative = infoPersonal
    }
    if (infoTeacher) {
        return (
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent sx={{ pt: 15, display: "flex", alignItems: "center", flexDirection: "column" }}>
                            {data.avatar ? (
                                <CustomAvatar src={data.avatar} variant="rounded" alt={data.fullName} sx={{ width: 120, height: 120, fontWeight: 600, mb: 4 }} />
                            ) : (
                                <CustomAvatar skin="light" variant="rounded" color={data.avatarColor as ThemeColor} sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: "3rem" }}>
                                    {getInitials(infoTeacher.firstName)}
                                </CustomAvatar>
                            )}
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                {`${infoTeacher.firstName} ${infoTeacher.lastName}`}
                            </Typography>
                        </CardContent>

                        <CardContent>
                            <Typography variant="h6">Detalles</Typography>
                            <Divider sx={{ mt: (theme) => `${theme.spacing(4)} !important` }} />
                            <Box sx={{ pt: 2, pb: 1 }}>
                                <Box sx={{ display: "flex", mb: 2.7 }}>
                                    <Typography variant="subtitle2" sx={{ mr: 2, color: "text.primary" }}>
                                        Código QR:
                                    </Typography>
                                    <Typography variant="body2">{infoTeacher.codeQr}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", mb: 2.7 }}>
                                    <Typography variant="subtitle2" sx={{ mr: 2, color: "text.primary" }}>
                                        Correo:
                                    </Typography>
                                    <Typography variant="body2">{infoTeacher.email}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", mb: 2.7 }}>
                                    <Typography variant="subtitle2" sx={{ mr: 2, color: "text.primary" }}>
                                        Estatus:
                                    </Typography>
                                    <CustomChip
                                        skin="light"
                                        size="small"
                                        label={infoTeacher.active ? "active" : "inactive"}
                                        color={statusColors[infoTeacher.active ? "active" : "inactive"]}
                                        sx={{
                                            height: 20,
                                            fontWeight: 500,
                                            fontSize: "0.75rem",
                                            borderRadius: "5px",
                                            textTransform: "capitalize",
                                        }}
                                    />
                                </Box>
                                <Box sx={{ display: "flex", mb: 2.7 }}>
                                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}>Condición:</Typography>
                                    <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                                        {infoTeacher.condition}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", mb: 2.7 }}>
                                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}>Escalafón:</Typography>
                                    <Typography variant="body2">{infoTeacher.scale}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", mb: 2.7 }}>
                                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}>Dedicación:</Typography>
                                    <Typography variant="body2">{infoTeacher.dedication}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    return null
}

export default UserViewLeft
