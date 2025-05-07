import React, { useState, useEffect, ReactNode } from "react";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DialogScanQr from "src/views/pages/scan";
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Third Party Components
import toast from "react-hot-toast";
import Countdown from "react-countdown";
import { useApolloClient } from "@apollo/client";
import { Attendance } from "src/services/graphql/types";
import UserViewMarkAttendance from "src/views/apps/administrative/markAttendance/UserViewPage";
import { useLazyMarkAttendanceAdministrative } from "src/services/graphql/hooks/administrative";

function Scan() {
  const [data, setData] = useState("");
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [loading, setLoading] = useState(false);
  const { mutate } = useApolloClient();

  const markAttendance = async (code: String) => {
    setLoading(true);
    const codeCleam = code.replace("https://", "").replace("http://", "").replace("qr.guarico.gob.ve/", "");

    const { data: dataAttendacen, error } = await useLazyMarkAttendanceAdministrative({ mutate, values: { codeQr: codeCleam, typeMark: "OUT" } });

    if (dataAttendacen) {
      setAttendance(dataAttendacen);
      toast.success("Registro completado");
    }
    if (error !== null && error !== "") {
      toast.error(error);
    }

    setLoading(false);
    setData("");
  };

  const clearData = () => {
    setLoading(false);
    setData("");
    setAttendance(null);
  };

  useEffect(() => {
    if (data !== "") {
      toast("Registrando...", { duration: 800 });
      markAttendance(data);
    }
  }, [data]);

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
    );
  }
  if (!attendance) {
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
            <DialogScanQr setData={setData} />
          </Grid>
       
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={6} className="match-height" justifyContent="center" alignItems="center">
          <Grid
            item
            md={12}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Countdown
              date={Date.now() + 10000}
              intervalDelay={0}
              precision={3}
              onComplete={clearData}
              renderer={(props) => {
                return (
                  <>
                    {attendance.Teacher && <UserViewMarkAttendance attendanceData={attendance} infoPersonal={{ ...attendance.Teacher, __typename: "Teacher" }} clearData={clearData} />}
                    {attendance.Worker && <UserViewMarkAttendance attendanceData={attendance} infoPersonal={{ ...attendance.Worker, __typename: "Worker" }} clearData={clearData} />}
                    {attendance.Administrative && (
                      <UserViewMarkAttendance attendanceData={attendance} infoPersonal={{ ...attendance.Administrative, __typename: "Administrative" }} clearData={clearData} />
                    )}
                  </>
                );
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

Scan.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default Scan;
