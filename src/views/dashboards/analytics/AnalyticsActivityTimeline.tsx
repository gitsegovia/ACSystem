import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import MuiTimeline, { TimelineProps } from "@mui/lab/Timeline";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Components Imports
import OptionsMenu from "src/@core/components/option-menu";
import { Attendance } from "src/services/graphql/types";
import moment from "moment-timezone";
import { minHeight } from "@mui/system";

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
});
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
});

type Props = {
  info: Attendance[];
};

const AnalyticsActivityTimeline = ({ info }: Props) => {
  const [dataLine, setDataLine] = useState<Attendance[]>([]);
  useEffect(() => {
    if (info.length > 5) {
      console.log(info);
      const newData = [...info];
      newData.length = 5;
      setDataLine(newData);
    } else {
      setDataLine(info);
    }
  }, [info]);

  return (
    <Card>
      <CardHeader title="Asistencia registrada mas reciente" />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(1)} !important` }}>
        <Timeline sx={{ my: 0, py: 0 }}>
          {dataLine.map((att, index) => {
            if (!att.out) {
              return (
                <TimelineItem key={att.id}>
                  <TimelineSeparator>
                    <TimelineDot color="success" />
                    {index + 1 !== dataLine.length && <TimelineConnector />}
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
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>{`Entrada: ${att.in ?? ""}`}</Typography>
                      <Typography variant="body2" sx={{ color: "text.disabled" }}>
                        {att.in &&
                          moment(`${moment().tz("America/Caracas").format("YYYY-MM-DD")} ${att.in}`)
                            .tz("America/Caracas")
                            .fromNow()}
                      </Typography>
                    </Box>

                    {att.Teacher && <Typography sx={{ color: "text.secondary" }}>{`Profesor: ${att.Teacher.firstName} ${att.Teacher.lastName}`}</Typography>}
                    {att.Worker && <Typography sx={{ color: "text.secondary" }}>{`Obrero: ${att.Worker.firstName} ${att.Worker.lastName}`}</Typography>}
                    {att.Administrative && <Typography sx={{ color: "text.secondary" }}>{`Administrativo: ${att.Administrative.firstName} ${att.Administrative.lastName}`}</Typography>}
                  </TimelineContent>
                </TimelineItem>
              );
            }
            return (
              <TimelineItem key={att.id}>
                <TimelineSeparator>
                  <TimelineDot color="warning" />
                  {index + 1 !== dataLine.length && <TimelineConnector />}
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
                    <Typography sx={{ mr: 2, fontWeight: 500 }}>{`Salida: ${att.out ?? ""}`}</Typography>
                    {att.out && (
                      <Typography variant="body2" sx={{ color: "text.disabled" }}>
                        {moment(`${moment().tz("America/Caracas").format("YYYY-MM-DD")} ${att.out}`)
                          .tz("America/Caracas")
                          .fromNow()}
                      </Typography>
                    )}
                  </Box>
                  {att.Teacher && <Typography sx={{ color: "text.secondary" }}>{`Profesor: ${att.Teacher.firstName} ${att.Teacher.lastName}`}</Typography>}
                  {att.Worker && <Typography sx={{ color: "text.secondary" }}>{`Obrero: ${att.Worker.firstName} ${att.Worker.lastName}`}</Typography>}
                  {att.Administrative && <Typography sx={{ color: "text.secondary" }}>{`Administrativo: ${att.Administrative.firstName} ${att.Administrative.lastName}`}</Typography>}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default AnalyticsActivityTimeline;
