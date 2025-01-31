import { useState, useEffect } from "react"
import moment from "moment-timezone"

// ** MUI Imports
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import { useTheme } from "@mui/material/styles"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"

import { getMomentDayOfWeek } from "src/utils/functions"
// ** Icon Imports
import Icon from "src/@core/components/icon"

// ** Third Party Imports
import { ApexOptions } from "apexcharts"

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar"
import OptionsMenu from "src/@core/components/option-menu"
import ReactApexcharts from "src/@core/components/react-apexcharts"

// ** Util Import
import { hexToRGBA } from "src/@core/utils/hex-to-rgba"
import { Attendance } from "src/services/graphql/types"

type Props = {
    info: Attendance[]
}

const AnalyticsVisitsByDay = ({ info }: Props) => {
    const [dayL, setDayL] = useState(0)
    const [dayM, setDayM] = useState(0)
    const [dayMM, setDayMM] = useState(0)
    const [dayJ, setDayJ] = useState(0)
    const [dayV, setDayV] = useState(0)
    const [dayS, setDayS] = useState(0)
    const [dayD, setDayD] = useState(0)
    const [dayMayor, setDayMayor] = useState({ day: "", count: 1 })

    // ** Hook
    const theme = useTheme()

    const [options, setOptions] = useState<ApexOptions>({
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                distributed: true,
                columnWidth: "51%",
                endingShape: "rounded",
                startingShape: "rounded",
            },
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        colors: [
            hexToRGBA(theme.palette.warning.main, 0.1),
            hexToRGBA(theme.palette.warning.main, 0.1),
            hexToRGBA(theme.palette.warning.main, 0.1),
            hexToRGBA(theme.palette.warning.main, 0.1),
            hexToRGBA(theme.palette.warning.main, 0.1),
            hexToRGBA(theme.palette.warning.main, 0.1),
            hexToRGBA(theme.palette.warning.main, 0.1),
        ],
        states: {
            hover: {
                filter: { type: "none" },
            },
            active: {
                filter: { type: "none" },
            },
        },
        xaxis: {
            axisTicks: { show: false },
            axisBorder: { show: false },
            categories: ["L", "M", "M", "J", "V", "S", "D"],
            labels: {
                style: { colors: theme.palette.text.disabled },
            },
        },
        yaxis: { show: false },
        grid: {
            show: false,
            padding: {
                top: -30,
                left: -7,
                right: -4,
            },
        },
    })

    useEffect(() => {
        if (info.length > 0) {
            let dL: number = 0,
                dM: number = 0,
                dMM: number = 0,
                dJ: number = 0,
                dV: number = 0,
                dS: number = 0,
                dD: number = 0

            const listWeek = new Map()
            info.forEach((att) => {
                const daySt = getMomentDayOfWeek(att.day)
                if (listWeek.has(daySt)) {
                    listWeek.set(daySt, listWeek.get(daySt) + 1)
                } else {
                    listWeek.set(daySt, 1)
                }
            })
            listWeek.forEach((value, key) => {
                if (value >= dayMayor.count) {
                    setDayMayor({
                        day: key,
                        count: value,
                    })
                }

                switch (key) {
                    case "Domingo":
                        setDayD(value)
                        dD = value
                        break
                    case "Lunes":
                        setDayL(value)
                        dL = value
                        break
                    case "Martes":
                        setDayM(value)
                        dM = value
                        break
                    case "Miercoles":
                        setDayMM(value)
                        dMM = value
                        break
                    case "Jueves":
                        setDayJ(value)
                        dJ = value
                        break
                    case "Viernes":
                        setDayV(value)
                        dV = value
                        break
                    case "Sabado":
                        setDayS(value)
                        dS = value
                        break

                    default:
                        break
                }
            })

            setOptions((value) => ({
                ...value,
                colors: [
                    hexToRGBA(theme.palette.warning.main, dL === 0 ? 0.1 : 1),
                    hexToRGBA(theme.palette.warning.main, dM === 0 ? 0.1 : 1),
                    hexToRGBA(theme.palette.warning.main, dMM === 0 ? 0.1 : 1),
                    hexToRGBA(theme.palette.warning.main, dJ === 0 ? 0.1 : 1),
                    hexToRGBA(theme.palette.warning.main, dV === 0 ? 0.1 : 1),
                    hexToRGBA(theme.palette.warning.main, dS === 0 ? 0.1 : 1),
                    hexToRGBA(theme.palette.warning.main, dD === 0 ? 0.1 : 1),
                ],
            }))
        }
    }, [info])

    return (
        <Card>
            <CardHeader
                title="Asistencia por día"
                subheader={`Total ${info.length}`}
                subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
                titleTypographyProps={{ sx: { letterSpacing: "0.15px" } }}
            />
            <CardContent sx={{ pt: { xs: `${theme.spacing(6)} !important`, md: `${theme.spacing(0)} !important` } }}>
                <ReactApexcharts
                    type="bar"
                    height={215}
                    options={options}
                    series={[
                        {
                            data: [
                                dayL !== 0 ? dayL : dayMayor.count / 2,
                                dayM !== 0 ? dayM : dayMayor.count / 2,
                                dayMM !== 0 ? dayMM : dayMayor.count / 2,
                                dayJ !== 0 ? dayJ : dayMayor.count / 2,
                                dayV !== 0 ? dayV : dayMayor.count / 2,
                                dayS !== 0 ? dayS : dayMayor.count / 2,
                                dayD !== 0 ? dayD : dayMayor.count / 2,
                            ],
                        },
                    ]}
                />
                <Box sx={{ mt: 5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ mb: 0.75, fontWeight: 600 }}>Mayor asistencia por dia</Typography>
                        <Typography variant="body2">{dayMayor.day !== "" ? `Día: ${dayMayor.day} Total: ${dayMayor.count}` : "Total: 0"}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default AnalyticsVisitsByDay
