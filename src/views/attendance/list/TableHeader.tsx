import { MouseEvent, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// ** Icon Imports
import Icon from "src/@core/components/icon";
import { Attendance } from "src/services/graphql/types";
import toast from "react-hot-toast";
import moment from "moment-timezone";
import generateXLS from "./GenerateXLS";
import generatePDF from "./GeneratePDF";

interface TableHeaderProps {
  value: string;
  handleFilter: (val: string) => void;
  dataFilter: Attendance[];
}

interface StatusObj {
  [ke: string]: {
    text: string;
  };
}

const statusObj: StatusObj = {
  Teacher: { text: "Profesor" },
  Worker: { text: "Obrero" },
  Administrative: { text: "Administrativo" },
};

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value, dataFilter } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleXLSX = () => {
    toast.promise(generateXLS({ title: "Libro de Asistencia", worksheetname: "Asistencia", dataFilter: dataFilter }), {
      loading: "Creando archivo",
      error: "Fallo el archivo",
      success: "Archivo generado",
    });
    handleClose();
  };

  const handlePDF = () => {
    const headerTable = ["Personal", "Tipo de personal", "Fecha", "Entrada", "Estatus", "Salida"];

    const listData: string[][] = [];
    dataFilter.forEach((row) => {
      const { Worker, Teacher, Administrative } = row;

      let firstName = Worker ? `${Worker.firstName}` : Teacher ? `${Teacher.firstName}` : Administrative ? `${Administrative.firstName}` : "";
      let lastName = Worker ? `${Worker.lastName}` : Teacher ? `${Teacher.lastName}` : Administrative ? `${Administrative.lastName}` : "";
      const typePersonal = row.Worker ? "Worker" : row.Administrative ? "Administrative" : "Teacher";

      const isAfter = moment(row.in, "HH:mm").isAfter(moment("08:15", "HH:mm"));
      listData.push([
        `${firstName} ${lastName}`,
        statusObj[typePersonal].text,
        `${moment(row.day).tz("America/Caracas").format("DD-MM-YYYY")}`,
        `${moment(row.in, "HH:mm").format("hh:mm a")}`,
        `${isAfter ? "Inacistente" : "Entrada correcta"}`,
        `${isAfter ? "" : row.out ? moment(row.out, "HH:mm").format("hh:mm a") : ""}`,
      ]);
    });

    toast.promise(generatePDF({ title: "Libro de Asistencia", headerTable, dataFilter: listData }), {
      loading: "Creando archivo",
      error: "Fallo el archivo",
      success: "Archivo generado",
    });
  };

  return (
    <Box sx={{ p: 5, pb: 3, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
      <Button
        variant="contained"
        aria-haspopup="true"
        onClick={handleClick}
        aria-expanded={open ? "true" : undefined}
        endIcon={<Icon icon="mdi:chevron-down" />}
        aria-controls={open ? "user-view-overview-export" : undefined}
      >
        Exportar
      </Button>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose} id="user-view-overview-export">
        <MenuItem onClick={handlePDF}>PDF</MenuItem>
        <MenuItem onClick={handleXLSX}>XLSX</MenuItem>
      </Menu>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <TextField size="small" value={value} sx={{ mr: 6, mb: 2 }} placeholder="Buscar personal" onChange={(e) => handleFilter(e.target.value)} />
      </Box>
    </Box>
  );
};

export default TableHeader;
