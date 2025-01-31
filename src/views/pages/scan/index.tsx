// ** React Imports
import { Ref, useState, forwardRef, ReactElement, SetStateAction } from "react"

// ** MUI Imports
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import Fade, { FadeProps } from "@mui/material/Fade"

// ** Icon Imports
import Icon from "src/@core/components/icon"

// ** Qr Import
import { QrReader } from "react-qr-reader"
import { margin } from "@mui/system"

const DialogScanQr = ({ setData }: { setData: React.Dispatch<SetStateAction<string>> }) => {
    // ** States
    const [show, setShow] = useState<boolean>(false)

    const handleClose = () => {
        setShow(false)
    }

    return (
        <Card>
            {!show ? (
                <CardContent sx={{ textAlign: "center", "& svg": { mb: 2 } }}>
                    <Icon icon="mdi:cube-outline" fontSize="2rem" />
                    <Typography variant="h6" sx={{ mb: 4 }}>
                        Asistencia
                    </Typography>
                    <Typography sx={{ mb: 3 }}>Pulse mostrar para escaner su Código QR y marcar su asistencia</Typography>
                    <Button variant="contained" onClick={() => setShow(true)}>
                        Mostrar
                    </Button>
                </CardContent>
            ) : (
                <CardContent sx={{ textAlign: "center", "& svg": { mb: 2 } }}>
                    <IconButton size="small" onClick={handleClose} sx={{ position: "absolute", right: "1rem", top: "1rem" }}>
                        <Icon icon="mdi:close" />
                    </IconButton>
                    <Box sx={{ mb: 3, textAlign: "center" }}>
                        <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                            Lector QR
                        </Typography>
                        <Typography variant="body2">Por favor muestre su código QR en la camara hasta que el sistema le indique, para hacer el registro de sus asistencia</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: { xs: "nowrap", md: "nowrap" }, flexDirection: "column" }}>
                        <Box sx={{ textAlign: "center" }}>
                            <Box sx={{ mt: 5, display: "flex", justifyContent: "center", width: "280px", height: "280px", marginLeft: "auto", marginRight: "auto" }}>
                                <div style={{ width: "280px", height: "280px" }}>
                                    <QrReader
                                        onResult={(result, error) => {
                                            if (!!result) {
                                                setData(result.getText())
                                                handleClose()
                                            }

                                            if (!!error) {
                                                //setData("")
                                                //console.error(error)
                                            }
                                        }}
                                        //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will
                                        // open the front camera
                                        constraints={{ facingMode: "environment" }}
                                        videoContainerStyle={{
                                            width: "250px",
                                            height: "250px",
                                            margin: "0px",
                                            padding: "0px",
                                        }}
                                    />
                                    <Button variant="contained" onClick={() => setShow(false)}>
                                        Salir
                                    </Button>
                                </div>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            )}
        </Card>
    )
}

export default DialogScanQr
