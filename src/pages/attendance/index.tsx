// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, FormEventHandler, FormEvent } from "react";

// ** Next Imports
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";

// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiFormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import moment, { Moment } from "moment-timezone";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Third Party Components
import axios from "axios";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { CardStatsType } from "src/@fake-db/types";
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Table Components Imports
import TableHeader from "src/views/attendance/list/TableHeader";
import { Attendance, Teacher } from "src/services/graphql/types";
import { useApolloClient } from "@apollo/client";
import { useLazyGetAllAttendance } from "src/services/graphql/hooks/attendance";
import DataGridList from "src/views/attendance/list/DataGridList";

interface UserRoleType {
  [key: string]: { icon: string; color: string };
}

interface UserStatusType {
  [key: string]: ThemeColor;
}
interface StatusObj {
  [ke: string]: {
    text: string;
    color: ThemeColor;
  };
}

const statusObj: StatusObj = {
  Teacher: { text: "Profesor", color: "primary" },
  Worker: { text: "Obrero", color: "info" },
  Administrative: { text: "Administrativo", color: "warning" },
};

// ** Vars
const userConditionObj: UserRoleType = {
  contratado: { icon: "mdi:laptop", color: "error.main" },
  ordinario: { icon: "mdi:cog-outline", color: "warning.main" },
};
const userScaleObj: UserRoleType = {
  agregado: { icon: "mdi:laptop", color: "error.main" },
  asistente: { icon: "mdi:cog-outline", color: "warning.main" },
  asociado: { icon: "mdi:pencil-outline", color: "info.main" },
  instructor: { icon: "mdi:chart-donut", color: "success.main" },
  titular: { icon: "mdi:account-outline", color: "primary.main" },
};
const userDedicationObj: UserRoleType = {
  convencional: { icon: "mdi:laptop", color: "error.main" },
  exclusiva: { icon: "mdi:cog-outline", color: "warning.main" },
  "medio tiempo": { icon: "mdi:pencil-outline", color: "info.main" },
  "tcv 6 horas": { icon: "mdi:chart-donut", color: "success.main" },
  "tcv 7 horas": { icon: "mdi:chart-donut", color: "success.main" },
  "tiempo completo": { icon: "mdi:account-outline", color: "primary.main" },
};

interface CellType {
  row: Attendance;
}

const userStatusObj: UserStatusType = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
};

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  textDecoration: "none",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

// ** renders client column
const renderClient = (name: string) => {
  return (
    <CustomAvatar skin="light" color={"primary"} sx={{ mr: 3, width: 34, height: 34, fontSize: "1rem" }}>
      {getInitials(name)}
    </CustomAvatar>
  );
};

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: "fullName",
    headerName: "Personal",
    renderCell: ({ row }: CellType) => {
      const { Worker, Teacher, Administrative } = row;
      let firstName = Worker ? `${Worker.firstName}` : Teacher ? `${Teacher.firstName}` : Administrative ? `${Administrative.firstName}` : "";
      let lastName = Worker ? `${Worker.lastName}` : Teacher ? `${Teacher.lastName}` : Administrative ? `${Administrative.lastName}` : "";

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(firstName)}
          <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
            <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: "nowrap", color: "text.primary" }}>{`${firstName} ${lastName}`}</Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    field: "typePersonal",
    minWidth: 150,
    headerName: "Tipo de personal",
    renderCell: ({ row }: CellType) => {
      const typePersonal = row.Worker ? "Worker" : row.Administrative ? "Administrative" : "Teacher";
      return (
        <CustomChip
          skin="light"
          size="small"
          label={statusObj[typePersonal].text}
          color={statusObj[typePersonal].color}
          sx={{ height: 20, fontWeight: 500, "& .MuiChip-label": { px: 1.625, lineHeight: 1.539 } }}
        />
      );
    },
  },
  {
    flex: 0.15,
    field: "day",
    minWidth: 150,
    headerName: "Fecha",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            textAlign: "right",
          }}
        >{`${moment(row.day).format("DD-MM-YYYY")}`}</Typography>
      );
    },
  },
  {
    flex: 0.15,
    field: "in",
    minWidth: 150,
    headerName: "Entrada",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            textAlign: "right",
            color: row.in ? "success.main" : "error.main",
          }}
        >{`${row.in}`}</Typography>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: "out",
    headerName: "Salida",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            textAlign: "right",
            color: row.out ? "success.main" : "error.main",
          }}
        >{`${row.out ?? ""}`}</Typography>
      );
    },
  },
];

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

const schema = yup.object().shape({
  dateStart: yup.date().required(),
  dateEnd: yup.date().required(),
});

const defaultValues = {
  dateStart: "",
  dateEnd: "",
};

interface FormData {
  dateStart: string;
  dateEnd: string;
}

type FetchDataProps = {
  dateStart?: string;
  dateEnd?: string;
};

const AttendanceBook = () => {
  // ** State
  const [dataAll, setDataAll] = useState<Attendance[]>([]);
  const [dataFilter, setDataFilter] = useState<Attendance[]>([]);
  const [value, setValue] = useState<string>("");
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [dateStart, setDateStart] = useState<Moment | null>(null);
  const [dateEnd, setDateEnd] = useState<Moment | null>(null);

  // ** Hooks
  const { query } = useApolloClient();
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async ({ dateStart = "", dateEnd = "" }: FetchDataProps) => {
    const { data } = await useLazyGetAllAttendance({
      query,
      values: {
        dateStart: dateStart,
        dateEnd: dateEnd,
      },
    });
    if (data) {
      setDataAll(data);
      setDataFilter(data);
    }
  };
  useEffect(() => {
    fetchData({});
  }, []);

  function isFilter(att: Attendance, index: any, array: any) {
    if (att.Worker) {
      if (att.Worker.lastName.toLowerCase().includes(value.toLowerCase()) || att.Worker.firstName.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
    }
    if (att.Administrative) {
      if (att.Administrative.lastName.toLowerCase().includes(value.toLowerCase()) || att.Administrative.firstName.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
    }
    if (att.Teacher) {
      if (att.Teacher.lastName.toLowerCase().includes(value.toLowerCase()) || att.Teacher.firstName.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
    }
    const typePersonal = att.Worker ? "obrero" : att.Administrative ? "administrativo" : "profesor";
    if (typePersonal.includes(value.toLowerCase())) {
      return true;
    }
    return false;
  }

  const handleFilter = useCallback((val: string) => {
    setValue(val);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchData({ dateStart: dateStart ? dateStart.format("YYYY-MM-DD") : "", dateEnd: dateEnd ? dateEnd.format("YYYY-MM-DD") : "" });
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Filtro de busqueda" sx={{ pb: 4, "& .MuiCardHeader-title": { letterSpacing: ".15px" } }} />
          <CardContent>
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
              <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <DatePicker
                      value={dateStart}
                      onChange={(e) => {
                        setDateStart(e), setDateEnd(null);
                      }}
                      label="Desde"
                      format="YYYY-MM-DD"
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <DatePicker value={dateEnd} onChange={(e) => setDateEnd(e)} label="Desde" format="YYYY-MM-DD" minDate={dateStart ?? undefined} />
                  </FormControl>
                </Grid>
                <Grid item sm={2} xs={12}>
                  <Button fullWidth size="large" type="submit" variant="contained" sx={{ mb: 7 }}>
                    Filtrar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} dataFilter={dataAll.filter(isFilter)} />
          <DataGridList dataFilter={dataAll.filter(isFilter)} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default AttendanceBook;
