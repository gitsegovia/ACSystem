// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from "react"

// ** Next Imports
import Link from "next/link"

// ** MUI Imports
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Menu from "@mui/material/Menu"
import Grid from "@mui/material/Grid"
import { styled } from "@mui/material/styles"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CardHeader from "@mui/material/CardHeader"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

// ** Icon Imports
import Icon from "src/@core/components/icon"

// ** Store Imports
import { useDispatch, useSelector } from "react-redux"

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip"
import CustomAvatar from "src/@core/components/mui/avatar"

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials"

// ** Actions Imports
import { fetchData, deleteUser } from "src/store/apps/worker"

// ** Third Party Components
import { useApolloClient } from "@apollo/client"
import toast from "react-hot-toast"

// ** Types Imports
import { RootState, AppDispatch } from "src/store"
import { Worker } from "src/services/graphql/types"
import { ThemeColor } from "src/@core/layouts/types"

// ** Custom Table Components Imports
import TableHeader from "src/views/apps/worker/list/TableHeader"
import AddUserDrawer from "src/views/apps/worker/list/AddUserDrawer"
import EditUserDrawer from "src/views/apps/worker/list/EditUserDrawer"

interface UserRoleType {
    [key: string]: { icon: string; color: string }
}

interface UserStatusType {
    [key: string]: ThemeColor
}

// ** Vars
const userConditionObj: UserRoleType = {
    contratado: { icon: "mdi:laptop", color: "error.main" },
}

interface CellType {
    row: Worker
}

const userStatusObj: UserStatusType = {
    active: "success",
    pending: "warning",
    inactive: "secondary",
}

const LinkStyled = styled(Link)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
        color: theme.palette.primary.main,
    },
}))

// ** renders client column
const renderClient = (row: Worker) => {
    return (
        <CustomAvatar skin="light" color={"primary"} sx={{ mr: 3, width: 34, height: 34, fontSize: "1rem" }}>
            {getInitials(row.firstName ? row.firstName : "T")}
        </CustomAvatar>
    )
}

const RowOptions = ({ info }: { info: Worker }) => {
    const [openEdit, setOpenEdit] = useState(false)
    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const { query, mutate } = useApolloClient()

    const handleEditClose = () => setOpenEdit(!openEdit)

    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
        setAnchorEl(null)
    }

    const handleEdit = () => {
        handleEditClose()
        handleRowOptionsClose()
    }
    const handleDelete = () => {
        dispatch(
            deleteUser({
                mutate,
                query,
                data: { id: info.id },
                callback: (data, error) => {
                    if (error !== "") {
                        toast.error(error)
                    }
                },
            })
        )
        handleRowOptionsClose()
    }

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
                <MenuItem component={Link} sx={{ "& svg": { mr: 2 } }} onClick={handleRowOptionsClose} href={`/apps/worker/view/overview/${info.id}`}>
                    <Icon icon="mdi:eye-outline" fontSize={20} />
                    View
                </MenuItem>
                {info.active && (
                    <MenuItem onClick={handleEdit} sx={{ "& svg": { mr: 2 } }}>
                        <Icon icon="mdi:pencil-outline" fontSize={20} />
                        Edit
                    </MenuItem>
                )}
                {info.active && (
                    <MenuItem onClick={handleDelete} sx={{ "& svg": { mr: 2 } }}>
                        <Icon icon="mdi:delete-outline" fontSize={20} />
                        Delete
                    </MenuItem>
                )}
            </Menu>

            {openEdit === true && <EditUserDrawer open={openEdit} toggle={handleEditClose} infoWorker={info} />}
        </>
    )
}

const columns: GridColDef[] = [
    {
        flex: 0.2,
        minWidth: 230,
        field: "fullName",
        headerName: "Obrero",
        renderCell: ({ row }: CellType) => {
            const { firstName, lastName, codeQr } = row

            return (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {renderClient(row)}
                    <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                        <LinkStyled href={`/apps/worker/view/overview/${row.id}`}>{`${firstName} ${lastName}`}</LinkStyled>
                        <Typography noWrap variant="caption">
                            {`@${codeQr}`}
                        </Typography>
                    </Box>
                </Box>
            )
        },
    },
    {
        flex: 0.15,
        field: "condition",
        minWidth: 150,
        headerName: "Grado",
        renderCell: ({ row }: CellType) => {
            return (
                <Box sx={{ display: "flex", alignItems: "center", "& svg": { mr: 3, color: userConditionObj["contratado"].color ?? "error.main" } }}>
                    <Icon icon={userConditionObj["contratado"].icon} fontSize={20} />
                    <Typography noWrap sx={{ color: "text.secondary", textTransform: "capitalize" }}>
                        {row.condition}
                    </Typography>
                </Box>
            )
        },
    },
    {
        flex: 0.1,
        minWidth: 110,
        field: "active",
        headerName: "Estatus",
        renderCell: ({ row }: CellType) => {
            return (
                <CustomChip
                    skin="light"
                    size="small"
                    label={row.active ? "active" : "inactive"}
                    color={userStatusObj[row.active ? "active" : "inactive"]}
                    sx={{ textTransform: "capitalize", "& .MuiChip-label": { lineHeight: "18px" } }}
                />
            )
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
]

const UserList = () => {
    // ** State
    const [value, setValue] = useState<string>("")
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

    // ** Hooks
    const { query } = useApolloClient()
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.worker)

    useEffect(() => {
        dispatch(
            fetchData({
                query,
                role: "",
                status: "",
                q: value,
                currentPlan: "",
            })
        )
    }, [dispatch])

    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])

    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

    function isFilter(element: Worker, index: any, array: any) {
        return (
            element.firstName.toLowerCase().includes(value.toLowerCase()) ||
            element.lastName.toLowerCase().includes(value.toLowerCase()) ||
            element.condition.toLowerCase().includes(value.toLowerCase())
        )
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Filtro de busqueda" sx={{ pb: 4, "& .MuiCardHeader-title": { letterSpacing: ".15px" } }} />

                    <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
                    <DataGrid
                        autoHeight
                        rows={store.data.filter(isFilter)}
                        columns={columns}
                        hideFooterPagination={true}
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
    )
}

export default UserList
