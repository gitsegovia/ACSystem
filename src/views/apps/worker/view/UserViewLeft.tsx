// ** React Imports
import { useState } from "react"

// ** MUI Imports
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"

// ** Custom Components
import CustomChip from "src/@core/components/mui/chip"
import CustomAvatar from "src/@core/components/mui/avatar"
import UserSuspendDialog from "src/views/apps/worker/view/UserSuspendDialog"
import EditUserDrawer from "src/views/apps/worker/list/EditUserDrawer"
import ShowCodeQr from "src/layouts/components/showCodeQr"

// ** Types
import { ThemeColor } from "src/@core/layouts/types"
import { Worker } from "src/services/graphql/types"

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials"

interface ColorsType {
    [key: string]: ThemeColor
}

const data = {
    id: 1,
    avatarColor: "primary",
    avatar: "/images/avatars/4.png",
}

const statusColors: ColorsType = {
    active: "success",
    pending: "warning",
    inactive: "secondary",
}

type Props = {
    infoWorker: Worker
}

const UserViewLeft = ({ infoWorker }: Props) => {
    // ** States
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
    const [info, setInfo] = useState(infoWorker)

    // Handle Edit dialog
    const handleEditClickOpen = () => setOpenEdit(true)
    const handleEditClose = () => setOpenEdit(false)

    if (info) {
        return (
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent sx={{ pt: 15, display: "flex", alignItems: "center", flexDirection: "column" }}>
                            {data.avatar ? (
                                <CustomAvatar src={data.avatar} variant="rounded" alt={info.firstName} sx={{ width: 120, height: 120, fontWeight: 600, mb: 4 }} />
                            ) : (
                                <CustomAvatar skin="light" variant="rounded" color={data.avatarColor as ThemeColor} sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: "3rem" }}>
                                    {getInitials(info.firstName)}
                                </CustomAvatar>
                            )}
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                {`${info.firstName} ${info.lastName}`}
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
                                    <Typography variant="body2">{info.codeQr}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", mb: 2.7 }}>
                                    <Typography variant="subtitle2" sx={{ mr: 2, color: "text.primary" }}>
                                        Correo:
                                    </Typography>
                                    <Typography variant="body2">{info.email}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", mb: 2.7 }}>
                                    <Typography variant="subtitle2" sx={{ mr: 2, color: "text.primary" }}>
                                        Estatus:
                                    </Typography>
                                    <CustomChip
                                        skin="light"
                                        size="small"
                                        label={info.active ? "active" : "inactive"}
                                        color={statusColors[info.active ? "active" : "inactive"]}
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
                                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}>Grado:</Typography>
                                    <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                                        {info.condition}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>

                        {info.active && (
                            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="contained" sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                                    Edit
                                </Button>
                                <Button color="error" variant="outlined" onClick={() => setSuspendDialogOpen(true)}>
                                    Suspend
                                </Button>
                            </CardActions>
                        )}

                        <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} id={info.id} />
                        <EditUserDrawer
                            open={openEdit}
                            toggle={handleEditClose}
                            update={(data) => {
                                setInfo(data)
                            }}
                            infoWorker={info}
                        />
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ boxShadow: "none", border: (theme) => `2px solid ${theme.palette.primary.main}` }}>
                        <CardContent sx={{ display: "flex", flexWrap: "wrap", pb: "0 !important", justifyContent: "space-between" }}>
                            <ShowCodeQr qrCode={info.codeQr} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    } else {
        return null
    }
}

export default UserViewLeft
