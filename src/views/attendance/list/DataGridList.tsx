// ** MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment-timezone";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Table Components Imports
import { Attendance } from "src/services/graphql/types";
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

interface CellType {
  row: Attendance;
}

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
        >{`${moment(row.day).tz("America/Caracas").format("DD-MM-YYYY")}`}</Typography>
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

const DataGridList = ({ dataFilter }: { dataFilter: Attendance[] }) => {
  return (
    <DataGrid
      autoHeight
      rows={dataFilter}
      columns={columns}
      disableRowSelectionOnClick
      hideFooterPagination={true}
      localeText={{
        noRowsLabel: "No se encontraron registros",
      }}
      sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
    />
  );
};

export default DataGridList;
