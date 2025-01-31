import React, { useState } from "react"
import QRCode from "react-qr-code"
import Box from "@mui/material/Box"

type Props = {
    qrCode: string
}

function ShowCodeQr({ qrCode }: Props) {
    return <Box sx={{ width: "100%", paddingBottom: 5, display: "flex", flex: "row", alignItems: "center", justifyContent: "center" }}>{qrCode !== "" && <QRCode value={qrCode} />}</Box>
}

export default ShowCodeQr
