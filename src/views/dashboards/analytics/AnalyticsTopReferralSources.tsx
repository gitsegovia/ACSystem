// ** React Imports
import { SyntheticEvent, useState } from "react"

// ** MUI Import
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Card from "@mui/material/Card"
import TabList from "@mui/lab/TabList"
import Table from "@mui/material/Table"
import TabPanel from "@mui/lab/TabPanel"
import Avatar from "@mui/material/Avatar"
import TabContext from "@mui/lab/TabContext"
import TableRow from "@mui/material/TableRow"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import TableContainer from "@mui/material/TableContainer"

// ** Icon Imports
import Icon from "src/@core/components/icon"

// ** Type Imports
import { ThemeColor } from "src/@core/layouts/types"

// ** Custom Components
import CustomChip from "src/@core/components/mui/chip"
import OptionsMenu from "src/@core/components/option-menu"

// ** Util Import
import { hexToRGBA } from "src/@core/utils/hex-to-rgba"
import { Attendance } from "src/services/graphql/types"
import moment from "moment-timezone"

interface StatusObj {
    [ke: string]: {
        text: string
        color: ThemeColor
    }
}

type Props = {
    info: Attendance[]
}

const statusObj: StatusObj = {
    Teacher: { text: "Profesor", color: "primary" },
    Worker: { text: "Obrero", color: "info" },
    Administrative: { text: "Administrativo", color: "warning" },
}

const RenderTabContent = ({ data }: { data: Attendance[] }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow sx={{ "& .MuiTableCell-root": { py: (theme) => `${theme.spacing(2.5)} !important` } }}>
                        <TableCell>Personal</TableCell>
                        <TableCell align="right">Tipo de personal</TableCell>
                        <TableCell align="right">Fecha</TableCell>
                        <TableCell align="right">Entrada</TableCell>
                        <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                            Salida
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: Attendance, index: number) => {
                        const typePersonal = row.Worker ? "Worker" : row.Administrative ? "Administrative" : "Teacher"
                        let namePersonal = ""
                        if (row.Worker) {
                            namePersonal = `${row.Worker.firstName} ${row.Worker.lastName}`
                        }
                        if (row.Administrative) {
                            namePersonal = `${row.Administrative.firstName} ${row.Administrative.lastName}`
                        }
                        if (row.Teacher) {
                            namePersonal = `${row.Teacher?.firstName} ${row.Teacher?.lastName}`
                        }

                        return (
                            <TableRow key={index} sx={{ "& .MuiTableCell-root": { border: 0, py: (theme) => `${theme.spacing(3)} !important` } }}>
                                <TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: "nowrap", color: "text.primary" }}>
                                        {namePersonal}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <CustomChip
                                        skin="light"
                                        size="small"
                                        label={statusObj[typePersonal].text}
                                        color={statusObj[typePersonal].color}
                                        sx={{ height: 20, fontWeight: 500, "& .MuiChip-label": { px: 1.625, lineHeight: 1.539 } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            textAlign: "right",
                                        }}
                                    >{`${moment(row.day).format("DD-MM-YYYY")}`}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            textAlign: "right",
                                            color: row.in ? "success.main" : "error.main",
                                        }}
                                    >{`${row.in}`}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            textAlign: "right",
                                            color: row.out ? "success.main" : "error.main",
                                        }}
                                    >{`${row.out ?? "Sin marcar"}`}</Typography>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const AnalyticsTopReferralSources = ({ info }: Props) => {
    // ** State
    const [value, setValue] = useState<string>("google")

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <Card>
            <CardHeader
                title="Libro de asistencia del día"
                action={
                    <OptionsMenu
                        options={[
                            {
                                text: "ver mas",
                                href: "/attendance",
                            },
                        ]}
                        iconButtonProps={{ size: "small", className: "card-more-options" }}
                    />
                }
            />
            <TabContext value={value}>
                <TabPanel sx={{ p: 0, mb: 2.5 }} value="google">
                    <RenderTabContent data={info} />
                </TabPanel>
            </TabContext>
        </Card>
    )
}

export default AnalyticsTopReferralSources
