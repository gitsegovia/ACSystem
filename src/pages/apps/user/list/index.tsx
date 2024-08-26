// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Actions Imports
import { fetchData, deleteUser } from "src/store/apps/user";

// ** Third Party Components
import { useApolloClient } from "@apollo/client";
import toast from "react-hot-toast";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { Employee } from "src/services/graphql/types";
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Table Components Imports
import TableHeader from "src/views/apps/user/list/TableHeader";
import AddUserDrawer from "src/views/apps/user/list/AddUserDrawer";
import EditUserDrawer from "src/views/apps/user/list/EditUserDrawer";
import { useAuth } from "src/hooks/useAuth";

interface UserRoleType {
  [key: string]: { icon: string; color: string };
}

interface UserStatusType {
  [key: string]: ThemeColor;
}

// ** Vars
const userRoleObj: UserRoleType = {
  administrator: { icon: "mdi:laptop", color: "error.main" },
  author: { icon: "mdi:cog-outline", color: "warning.main" },
  editor: { icon: "mdi:pencil-outline", color: "info.main" },
  maintainer: { icon: "mdi:chart-donut", color: "success.main" },
  subscriber: { icon: "mdi:account-outline", color: "primary.main" },
};

interface CellType {
  row: Employee;
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
const renderClient = (row: Employee) => {
  return (
    <CustomAvatar skin="light" color={"primary"} sx={{ mr: 3, width: 34, height: 34, fontSize: "1rem" }}>
      {getInitials(row.firstName ? row.firstName : "John Doe")}
    </CustomAvatar>
  );
};

const RowOptions = ({ info }: { info: Employee }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { query, mutate } = useApolloClient();
  const auth = useAuth();

  const handleEditClose = () => setOpenEdit(!openEdit);

  const handleViewClose = () => setOpenView(!openView);

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    handleViewClose();
    handleRowOptionsClose();
  };
  const handleEdit = () => {
    handleEditClose();
    handleRowOptionsClose();
  };
  const handleDelete = () => {
    dispatch(
      deleteUser({
        mutate,
        query,
        data: { id: info.id },
        callback: (data, error) => {
          if (error !== "") {
            toast.error(error);
          }
        },
      })
    );
    handleRowOptionsClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <Icon icon="mdi:dots-vertical" />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{ style: { minWidth: "8rem" } }}
      >
        <MenuItem onClick={handleEdit} sx={{ "& svg": { mr: 2 } }}>
          <Icon icon="mdi:pencil-outline" fontSize={20} />
          Edit
        </MenuItem>
        {auth.user?.id !== info.User.id && (
          <MenuItem onClick={handleDelete} sx={{ "& svg": { mr: 2 } }}>
            <Icon icon="mdi:delete-outline" fontSize={20} />
            Delete
          </MenuItem>
        )}
      </Menu>
      {openEdit === true && <EditUserDrawer open={openEdit} toggle={handleEditClose} infoEmployee={info} />}
    </>
  );
};

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: "fullName",
    headerName: "Empleado",
    renderCell: ({ row }: CellType) => {
      const { firstName, lastName } = row;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(row)}
          <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
            <Typography>{`${firstName} ${lastName}`}</Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: "email",
    headerName: "Correo",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant="body2">
          {row.User.email}
        </Typography>
      );
    },
  },
  {
    flex: 0.15,
    field: "role",
    minWidth: 150,
    headerName: "Rol",
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", "& svg": { mr: 3, color: userRoleObj[row.role].color } }}>
          <Icon icon={userRoleObj[row.role].icon} fontSize={20} />
          <Typography noWrap sx={{ color: "text.secondary", textTransform: "capitalize" }}>
            Administrador
          </Typography>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: "status",
    headerName: "Estatus",
    renderCell: ({ row }: CellType) => {
      return <CustomChip skin="light" size="small" label={"Active"} color={userStatusObj["active"]} sx={{ textTransform: "capitalize", "& .MuiChip-label": { lineHeight: "18px" } }} />;
    },
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: "actions",
    headerName: "Acciones",
    renderCell: ({ row }: CellType) => <RowOptions info={row} />,
  },
];

const UserList = () => {
  // ** State
  const [value, setValue] = useState<string>("");
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  // ** Hooks
  const { query } = useApolloClient();
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(
      fetchData({
        query,
        role: "",
        status: "",
        q: value,
        currentPlan: "",
      })
    );
  }, [dispatch]);

  const handleFilter = useCallback((val: string) => {
    setValue(val);
  }, []);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  function isFilter(element: Employee, index: any, array: any) {
    return (
      element.firstName.toLowerCase().includes(value.toLowerCase()) || element.lastName.toLowerCase().includes(value.toLowerCase()) || element.User.email.toLowerCase().includes(value.toLowerCase())
    );
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Search Filters" sx={{ pb: 4, "& .MuiCardHeader-title": { letterSpacing: ".15px" } }} />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={store.data.filter(isFilter)}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 }, "& .MuiDataGrid-cell": { maxHeight: "75px !important" } }}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  );
};

export default UserList;
