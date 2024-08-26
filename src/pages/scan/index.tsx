import React, { useState, useEffect, ReactNode, useRef } from "react"

// ** MUI Imports
import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import DialogScanQr from "src/views/pages/scan"
import BlankLayout from "src/@core/layouts/BlankLayout"

// ** Third Party Components
import toast from "react-hot-toast"
import Countdown from "react-countdown"
import { useApolloClient } from "@apollo/client"
import { useLazyMarkAttendanceTeacher } from "src/services/graphql/hooks/teacher"
import { Attendance } from "src/services/graphql/types"
import UserViewMarkAttendance from "src/views/apps/teacher/markAttendance/UserViewPage"
import { useLazyMarkAttendanceWorker } from "src/services/graphql/hooks/worker"
import { useLazyMarkAttendanceAdministrative } from "src/services/graphql/hooks/administrative"

function Scan() {
    const [data, setData] = useState("")
    const [attendance, setAttendance] = useState<Attendance | null>(null)
    const [loading, setLoading] = useState(false)
    const { mutate } = useApolloClient()

    const markAttendance = async (code: String) => {
        setLoading(true)
        const splitCode = code.split("-")

        if (splitCode[0] === "T") {
            const { data: dataAttendacen, error } = await useLazyMarkAttendanceTeacher({ mutate, values: { codeQr: code, typeMark: "OUT" } })

            if (dataAttendacen) {
                setAttendance(dataAttendacen)
                toast.success("Registro completado")
            }
            if (error !== null && error !== "") {
                toast.error(error)
            }

            setLoading(false)
            setData("")
        }
        if (splitCode[0] === "W") {
            const { data: dataAttendacen, error } = await useLazyMarkAttendanceWorker({ mutate, values: { codeQr: code, typeMark: "OUT" } })

            if (dataAttendacen) {
                setAttendance(dataAttendacen)
                toast.success("Registro completado")
            }
            if (error !== null && error !== "") {
                toast.error(error)
            }

            setLoading(false)
            setData("")
        }
        if (splitCode[0] === "A") {
            const { data: dataAttendacen, error } = await useLazyMarkAttendanceAdministrative({ mutate, values: { codeQr: code, typeMark: "OUT" } })

            if (dataAttendacen) {
                setAttendance(dataAttendacen)
                toast.success("Registro completado")
            }
            if (error !== null && error !== "") {
                toast.error(error)
            }

            setLoading(false)
            setData("")
        }
    }

    const clearData = () => {
        console.log("LIMPIAR")
        setLoading(false)
        setData("")
        setAttendance(null)
    }

    useEffect(() => {
        if (data !== "") {
            toast("Registrando...", { duration: 800 })
            markAttendance(data)
        }
    }, [data])

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Grid container spacing={6} className="match-height" justifyContent="center" alignItems="center">
                    <Grid item md={4}>
                        <CircularProgress color="inherit" size={20} />
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Grid container spacing={6} className="match-height" justifyContent="center" alignItems="center">
                {!attendance ? (
                    <Grid item md={4}>
                        <DialogScanQr setData={setData} />
                    </Grid>
                ) : (
                    <Grid item md={12}>
                        <Countdown
                            date={Date.now() + 10000}
                            intervalDelay={0}
                            precision={3}
                            onComplete={clearData}
                            renderer={(props) => {
                                if (attendance.Teacher) {
                                    return <UserViewMarkAttendance attendanceData={attendance} infoPersonal={{ ...attendance.Teacher, __typename: "Teacher" }} />
                                }
                                if (attendance.Worker) {
                                    return <UserViewMarkAttendance attendanceData={attendance} infoPersonal={{ ...attendance.Worker, __typename: "Worker" }} />
                                }
                                if (attendance.Administrative) {
                                    return <UserViewMarkAttendance attendanceData={attendance} infoPersonal={{ ...attendance.Administrative, __typename: "Administrative" }} />
                                }
                            }}
                        />
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

Scan.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Scan
