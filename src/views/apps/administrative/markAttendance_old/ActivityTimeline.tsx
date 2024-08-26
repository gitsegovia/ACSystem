// ** MUI Imports
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import { styled } from "@mui/material/styles"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineItem from "@mui/lab/TimelineItem"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import MuiTimeline, { TimelineProps } from "@mui/lab/Timeline"
import moment from "moment-timezone"
moment.locale("es", {
    months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
    monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split("_"),
    weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
    weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
    weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
    relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: "unos segundos",
        ss: "%d segundos",
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un día",
        dd: "%d días",
        w: "una semana",
        ww: "%d semanas",
        M: "un mes",
        MM: "%d meses",
        y: "un año",
        yy: "%d años",
    },
})

// ** Icon Imports
import Icon from "src/@core/components/icon"

// ** Custom Components Import
import OptionsMenu from "src/@core/components/option-menu"
import { Attendance } from "src/services/graphql/types"

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
    paddingLeft: 0,
    paddingRight: 0,
    "& .MuiTimelineItem-root": {
        width: "100%",
        "&:before": {
            display: "none",
        },
    },
})

type Props = {
    data: Attendance
    type: string
}
const ActivityTimeline = ({ data, type }: Props) => {
    return (
        <Card>
            <CardHeader
                title="Registro de asistencia"
                sx={{ "& .MuiCardHeader-avatar": { mr: 2.5 } }}
                avatar={<Icon icon="mdi:format-list-bulleted" />}
                titleTypographyProps={{ sx: { color: "text.primary" } }}
            />
            <CardContent>
                <Timeline sx={{ my: 0, py: 0 }}>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color="success" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: 0 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography sx={{ mr: 2, fontWeight: 500 }}>{`Entrada: ${data.in ?? ""}`}</Typography>
                                <Typography variant="body2" sx={{ color: "text.disabled" }}>
                                    {data.in && moment(`${moment().format("YYYY-MM-DD")} ${data.in}`).fromNow()}
                                </Typography>
                            </Box>
                            <Typography sx={{ color: "text.secondary" }}>
                                {type === "Administrative" ? "El personal administrativo ingreso al area" : type === "Worker" ? "El personal obrero ingreso al area" : "El profesor ingreso al area"}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color="warning" />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: 0, mb: (theme) => `${theme.spacing(2)} !important` }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography sx={{ mr: 2, fontWeight: 500 }}>{`Salida: ${data.out ?? ""}`}</Typography>
                                {data.out && (
                                    <Typography variant="body2" sx={{ color: "text.disabled" }}>
                                        {moment(`${moment().format("YYYY-MM-DD")} ${data.out}`).fromNow()}
                                    </Typography>
                                )}
                            </Box>
                            {data.out && (
                                <Typography sx={{ mb: 2, color: "text.secondary" }}>
                                    {type === "Administrative" ? "El personal administrativo salio al area" : type === "Worker" ? "El personal obrero salio al area" : "El profesor salio al area"}
                                </Typography>
                            )}
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </CardContent>
        </Card>
    )
}

export default ActivityTimeline
