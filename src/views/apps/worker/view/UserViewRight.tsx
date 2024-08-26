// ** React Imports
import { SyntheticEvent, useState, useEffect } from "react"

// ** Next Import
import { useRouter } from "next/router"

// ** MUI Imports
import Box from "@mui/material/Box"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import TabContext from "@mui/lab/TabContext"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import MuiTab, { TabProps } from "@mui/material/Tab"
import CircularProgress from "@mui/material/CircularProgress"

// ** Icon Imports
import Icon from "src/@core/components/icon"

// ** Demo Components Imports
import UserViewOverview from "src/views/apps/worker/view/UserViewOverview"

// ** Types
import { Attendance, Maybe } from "src/services/graphql/types"

interface Props {
    tab: string
    attendanceData: Maybe<Attendance>[]
}

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
    minHeight: 48,
    flexDirection: "row",
    "& svg": {
        marginBottom: "0 !important",
        marginRight: theme.spacing(1),
    },
}))

const UserViewRight = ({ tab, attendanceData }: Props) => {
    // ** State
    const [activeTab, setActiveTab] = useState<string>(tab)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // ** Hooks
    const router = useRouter()

    const handleChange = (event: SyntheticEvent, value: string) => {
        setIsLoading(true)
        setActiveTab(value)
        router
            .push({
                pathname: `/apps/user/view/${value.toLowerCase()}`,
            })
            .then(() => setIsLoading(false))
    }

    useEffect(() => {
        if (tab && tab !== activeTab) {
            setActiveTab(tab)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab])

    useEffect(() => {
        if (attendanceData) {
            setIsLoading(false)
        }
    }, [attendanceData])

    return (
        <TabContext value={activeTab}>
            <Box sx={{ mt: 0 }}>
                {isLoading ? (
                    <Box sx={{ mt: 6, display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <CircularProgress sx={{ mb: 4 }} />
                        <Typography>Cargando...</Typography>
                    </Box>
                ) : (
                    <TabPanel sx={{ p: 0 }} value="overview">
                        <UserViewOverview attendanceData={attendanceData} />
                    </TabPanel>
                )}
            </Box>
        </TabContext>
    )
}

export default UserViewRight
