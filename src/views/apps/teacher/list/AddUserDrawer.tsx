// ** MUI Imports
import Drawer from "@mui/material/Drawer"
import Select from "@mui/material/Select"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import InputLabel from "@mui/material/InputLabel"
import Typography from "@mui/material/Typography"
import Box, { BoxProps } from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"

// ** Third Party Imports
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import { useApolloClient } from "@apollo/client"

// ** Icon Imports
import Icon from "src/@core/components/icon"

// ** Store Imports
import { useDispatch, useSelector } from "react-redux"

// ** Actions Imports
import { addUser } from "src/store/apps/teacher"

// ** Types Imports
import { RootState, AppDispatch } from "src/store"
import { Teacher } from "src/services/graphql/types"

interface SidebarAddUserType {
    open: boolean
    toggle: () => void
}

interface UserData {
    email: string
    firstName: string
    lastName: string
    idnDni: string
    phone: string
    address: string
    position: string
    gender: string
    condition: string
    scale: string
    dedication: string
    department: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3, 4),
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.default,
}))

const schema = yup.object().shape({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    idnDni: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string(),
    position: yup.string(),
    gender: yup.string().required(),
    condition: yup.string().required(),
    scale: yup.string().required(),
    dedication: yup.string().required(),
    department: yup.string().required(),
})

const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
    idnDni: "",
    phone: "",
    address: "",
    position: "",
    gender: "",
    condition: "",
    scale: "",
    dedication: "",
    department: "",
}

const SidebarAddUser = (props: SidebarAddUserType) => {
    // ** Props
    const { open, toggle } = props

    // ** Hooks
    const { mutate, query } = useApolloClient()
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.teacher)
    const {
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(schema),
    })

    const onSubmit = (data: UserData) => {
        if (store.allData.some((u: Teacher) => u.email === data.email)) {
            store.allData.forEach((u: Teacher) => {
                if (u.email === data.email) {
                    setError("email", {
                        message: "Correo ya existe!",
                    })
                }
            })
        } else {
            dispatch(addUser({ mutate, query, data: { ...data } }))
            toggle()
            reset()
        }
    }

    const handleClose = () => {
        toggle()
        reset()
    }

    return (
        <Drawer open={open} anchor="right" variant="temporary" onClose={handleClose} ModalProps={{ keepMounted: true }} sx={{ "& .MuiDrawer-paper": { width: { xs: 300, sm: 400 } } }}>
            <Header>
                <Typography variant="h6">Nuevo profesor</Typography>
                <IconButton size="small" onClick={handleClose} sx={{ color: "text.primary" }}>
                    <Icon icon="mdi:close" fontSize={20} />
                </IconButton>
            </Header>
            <Box sx={{ p: 5 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                            name="firstName"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <TextField autoFocus value={value} label="Nombre" onChange={onChange} placeholder="John Doe" error={Boolean(errors.firstName)} />
                            )}
                        />
                        {errors.firstName && <FormHelperText sx={{ color: "error.main" }}>{errors.firstName.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => <TextField value={value} label="Apellido" onChange={onChange} placeholder="johndoe" error={Boolean(errors.lastName)} />}
                        />
                        {errors.lastName && <FormHelperText sx={{ color: "error.main" }}>{errors.lastName.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <TextField type="Correo" value={value} label="Email" onChange={onChange} placeholder="johndoe@email.com" error={Boolean(errors.email)} />
                            )}
                        />
                        {errors.email && <FormHelperText sx={{ color: "error.main" }}>{errors.email.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                            name="idnDni"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => <TextField value={value} label="Cedula" onChange={onChange} placeholder="" error={Boolean(errors.idnDni)} />}
                        />
                        {errors.idnDni && <FormHelperText sx={{ color: "error.main" }}>{errors.idnDni.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => <TextField value={value} label="Telefono" onChange={onChange} placeholder="(0424) 123-1234" error={Boolean(errors.phone)} />}
                        />
                        {errors.phone && <FormHelperText sx={{ color: "error.main" }}>{errors.phone.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <InputLabel id="gender-select">Genero</InputLabel>
                        <Controller
                            name="gender"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <Select fullWidth value={value} id="select-gender" label="Genero" labelId="gender-select" onChange={onChange} inputProps={{ placeholder: "Seleccione" }}>
                                    <MenuItem value="masculino">Masculino</MenuItem>
                                    <MenuItem value="femenino">Femenino</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.gender && <FormHelperText sx={{ color: "error.main" }}>{errors.gender.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <InputLabel id="condition-select">Condición</InputLabel>
                        <Controller
                            name="condition"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <Select fullWidth value={value} id="select-condition" label="Condición" labelId="condition-select" onChange={onChange} inputProps={{ placeholder: "Seleccione" }}>
                                    <MenuItem value="contratado">Contratado</MenuItem>
                                    <MenuItem value="ordinario">Ordinario</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.condition && <FormHelperText sx={{ color: "error.main" }}>{errors.condition.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <InputLabel id="department-select">Departamento</InputLabel>
                        <Controller
                            name="department"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <Select fullWidth value={value} id="select-department" label="Departamento" labelId="department-select" onChange={onChange} inputProps={{ placeholder: "Seleccione" }}>
                                    <MenuItem value="Ciencias básicas">Ciencias básicas</MenuItem>
                                    <MenuItem value="Ciencias de la computación">Ciencias de la computación</MenuItem>
                                    <MenuItem value="Formación profesional">Formación profesional</MenuItem>
                                    <MenuItem value="Estudios generales">Estudios generales</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.department && <FormHelperText sx={{ color: "error.main" }}>{errors.department.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <InputLabel id="scale-select">Escalafón</InputLabel>
                        <Controller
                            name="scale"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <Select fullWidth value={value} id="select-scale" label="Escalafón" labelId="scale-select" onChange={onChange} inputProps={{ placeholder: "Seleccione" }}>
                                    <MenuItem value="agregado">Agregado</MenuItem>
                                    <MenuItem value="asistente">Asistente</MenuItem>
                                    <MenuItem value="asociado">Asociado</MenuItem>
                                    <MenuItem value="instructor">Instructor</MenuItem>
                                    <MenuItem value="titular">Titular</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.scale && <FormHelperText sx={{ color: "error.main" }}>{errors.scale.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                        <InputLabel id="dedication-select">Dedicación</InputLabel>
                        <Controller
                            name="dedication"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <Select fullWidth value={value} id="select-dedication" label="Dedicación" labelId="dedication-select" onChange={onChange} inputProps={{ placeholder: "Seleccione" }}>
                                    <MenuItem value="convencional">Convencional</MenuItem>
                                    <MenuItem value="exclusiva">Exclusiva</MenuItem>
                                    <MenuItem value="medio tiempo">Medio tiempo</MenuItem>
                                    <MenuItem value="tcv 6 horas">Tcv 6 horas</MenuItem>
                                    <MenuItem value="tcv 7 horas">Tcv 7 horas</MenuItem>
                                    <MenuItem value="tiempo completo">Tiempo completo</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.dedication && <FormHelperText sx={{ color: "error.main" }}>{errors.dedication.message}</FormHelperText>}
                    </FormControl>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button size="large" type="submit" variant="contained" sx={{ mr: 3 }}>
                            Registrar
                        </Button>
                        <Button size="large" variant="outlined" color="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Drawer>
    )
}

export default SidebarAddUser
