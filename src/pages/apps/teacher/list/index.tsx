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
import { fetchData, deleteUser } from "src/store/apps/teacher"

// ** Third Party Components
import { useApolloClient } from "@apollo/client"
import toast from "react-hot-toast"

// ** Types Imports
import { RootState, AppDispatch } from "src/store"
import { Teacher } from "src/services/graphql/types"
import { ThemeColor } from "src/@core/layouts/types"

// ** Custom Table Components Imports
import TableHeader from "src/views/apps/teacher/list/TableHeader"
import AddUserDrawer from "src/views/apps/teacher/list/AddUserDrawer"
import EditUserDrawer from "src/views/apps/teacher/list/EditUserDrawer"

interface UserRoleType {
    [key: string]: { icon: string; color: string }
}

interface UserStatusType {
    [key: string]: ThemeColor
}

// ** Vars
const userConditionObj: UserRoleType = {
    contratado: { icon: "mdi:laptop", color: "error.main" },
    ordinario: { icon: "mdi:cog-outline", color: "warning.main" },
}
const userScaleObj: UserRoleType = {
    agregado: { icon: "mdi:laptop", color: "error.main" },
    asistente: { icon: "mdi:cog-outline", color: "warning.main" },
    asociado: { icon: "mdi:pencil-outline", color: "info.main" },
    instructor: { icon: "mdi:chart-donut", color: "success.main" },
    titular: { icon: "mdi:account-outline", color: "primary.main" },
}

interface CellType {
    row: Teacher
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
const renderClient = (row: Teacher) => {
    return (
        <CustomAvatar skin="light" color={"primary"} sx={{ mr: 3, width: 34, height: 34, fontSize: "1rem" }}>
            {getInitials(row.firstName ? row.firstName : "T")}
        </CustomAvatar>
    )
}

const RowOptions = ({ info }: { info: Teacher }) => {
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
                <MenuItem component={Link} sx={{ "& svg": { mr: 2 } }} onClick={handleRowOptionsClose} href={`/apps/teacher/view/overview/${info.id}`}>
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

            {openEdit === true && <EditUserDrawer open={openEdit} toggle={handleEditClose} infoTeacher={info} />}
        </>
    )
}

const columns: GridColDef[] = [
    {
        flex: 0.2,
        minWidth: 230,
        field: "fullName",
        headerName: "Profesor",
        renderCell: ({ row }: CellType) => {
            const { firstName, lastName, codeQr, id } = row

            return (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {renderClient(row)}
                    <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                        <LinkStyled href={`/apps/teacher/view/overview/${id}`}>{`${firstName} ${lastName}`}</LinkStyled>
                        <Typography noWrap variant="caption">
                            {`@${codeQr}`}
                        </Typography>
                    </Box>
                </Box>
            )
        },
    },
    {
        field: "department",
        maxWidth: 350,
        minWidth: 280,
        headerName: "Departamento",
        renderCell: ({ row }: CellType) => {
            return (
                <Box sx={{ display: "flex", alignItems: "center", "& svg": { mr: 3, color: userConditionObj[row.condition].color ?? "error.main" } }}>
                    <Box sx={{ flex: 0.1 }}>
                        <Icon icon={userConditionObj[row.condition].icon} fontSize={20} />
                    </Box>
                    <Box sx={{ flex: 0.8 }}>
                        <Typography sx={{ color: "text.secondary", textTransform: "capitalize" }}>{row.department}</Typography>
                    </Box>
                </Box>
            )
        },
    },
    {
        flex: 0.15,
        field: "condition",
        minWidth: 150,
        headerName: "Condición",
        renderCell: ({ row }: CellType) => {
            return (
                <Box sx={{ display: "flex", alignItems: "center", "& svg": { mr: 3, color: userConditionObj[row.condition].color ?? "error.main" } }}>
                    <Icon icon={userConditionObj[row.condition].icon} fontSize={20} />
                    <Typography noWrap sx={{ color: "text.secondary", textTransform: "capitalize" }}>
                        {row.condition}
                    </Typography>
                </Box>
            )
        },
    },
    {
        flex: 0.15,
        field: "scale",
        minWidth: 150,
        headerName: "Escalafón",
        renderCell: ({ row }: CellType) => {
            return (
                <Box sx={{ display: "flex", alignItems: "center", "& svg": { mr: 3, color: userScaleObj[row.scale].color } }}>
                    <Icon icon={userScaleObj[row.scale].icon} fontSize={20} />
                    <Typography noWrap sx={{ color: "text.secondary", textTransform: "capitalize" }}>
                        {row.scale}
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
    const store = useSelector((state: RootState) => state.teacher)

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

    function isFilter(element: Teacher, index: any, array: any) {
        return (
            element.firstName.toLowerCase().includes(value.toLowerCase()) ||
            element.lastName.toLowerCase().includes(value.toLowerCase()) ||
            element.condition.toLowerCase().includes(value.toLowerCase()) ||
            element.position?.toLowerCase().includes(value.toLowerCase()) ||
            element.scale?.toLowerCase().includes(value.toLowerCase()) ||
            element.department?.toLowerCase().includes(value.toLowerCase())
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
