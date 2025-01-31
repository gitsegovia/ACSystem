import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

// ** Demo Components Imports
import AnalyticsWeeklySales from "src/views/dashboards/analytics/AnalyticsWeeklySales";
import AnalyticsVisitsByDay from "src/views/dashboards/analytics/AnalyticsVisitsByDay";
import AnalyticsActivityTimeline from "src/views/dashboards/analytics/AnalyticsActivityTimeline";
import AnalyticsTopReferralSources from "src/views/dashboards/analytics/AnalyticsTopReferralSources";
import { Attendance } from "src/services/graphql/types";
import { useLazyGetAttendanceToDay } from "src/services/graphql/hooks/attendance";

const AnalyticsDashboard = () => {
  const [infoDay, setInfoDay] = useState<Attendance[]>([]);
  const [infoWeek, setInfoWeek] = useState<Attendance[]>([]);
  const { query } = useApolloClient();

  function isSort(a: Attendance, b: Attendance, ASC = true) {
    const horaA = moment(a.in, "HH:mm");
    const horaB = moment(b.in, "HH:mm");
    return ASC ? horaA.diff(horaB) : horaB.diff(horaA);
  }

  const getData = async () => {
    const { data: dataDay } = await useLazyGetAttendanceToDay({ query });
    if (dataDay) {
      setInfoDay(dataDay);
    }
    const { data: dataWeek } = await useLazyGetAttendanceToDay({ query });
    if (dataWeek) {
      setInfoWeek(dataWeek);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className="match-height">
        <Grid item xs={12} md={8}>
          <AnalyticsActivityTimeline info={infoDay.sort(isSort)} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsVisitsByDay info={infoWeek} />
        </Grid>
        <Grid item xs={12} md={12}>
          <AnalyticsTopReferralSources info={infoDay.sort((a, b) => isSort(a, b, false))} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default AnalyticsDashboard;
