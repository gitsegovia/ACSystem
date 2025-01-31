// ** Next Imports
import type { NextPage } from "next"
import type { AppProps } from "next/app"

// ** Other type
import type { EmotionCache } from "@emotion/cache"

// ** Global css styles
import "../../styles/globals.css"
import "../../styles/flex-dnd.css"
import "../../styles/draft-js.css"

// Services import
import DataQueryClient from "src/services/dataQueryClient"

// Dashboard import
import AdminDashboard from "src/pages/adminDashboard"

// Date picker
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"

// 404 import
import Error404 from "./404"

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
    Component: NextPage
    emotionCache: EmotionCache
}

const App = (props: ExtendedAppProps) => {
    // Validate route path redirect dashboar
    // props.router.route
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DataQueryClient>
                <AdminDashboard {...props} />
            </DataQueryClient>
        </LocalizationProvider>
    )
    // return <Error404 />
}

export default App
