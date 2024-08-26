// ** Redux Imports
import { Dispatch } from "redux"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ** Axios Imports
import axios from "axios"
import { useLazyCreateAdministrative, useLazyGetAllAdministrative, useLazyDeleteAdministrativeById, useLazyDisableAdministrativeById } from "src/services/graphql/hooks/administrative"
import { Administrative } from "src/services/graphql/types"

interface DataParams {
    query: any
    q: string
    role: string
    status: string
    currentPlan: string
}

interface DataAddParams {
    query: any
    mutate: any
    data: { [key: string]: number | string }
    callback?: (data: any, error: any) => void
}

interface Redux {
    getState: any
    dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk("appAdministratives/fetchData", async (params: DataParams) => {
    const { data } = await useLazyGetAllAdministrative({ query: params.query })

    if (data) {
        return {
            allData: data.results ? data.results : ([] as Administrative[]),
            users: data.results ? data.results : ([] as Administrative[]),
            params: params,
            total: data.infoPage ? data.infoPage.count : 0,
        }
    }

    return {
        allData: [],
        users: [],
        params: params,
        total: 0,
    }
})

// ** Add User
export const addUser = createAsyncThunk("appAdministratives/addUser", async (params: DataAddParams, { getState, dispatch }: Redux) => {
    // const response = await axios.post("/apps/users/add-user", {
    //     data,
    // })

    const { data, error } = await useLazyCreateAdministrative({ mutate: params.mutate, values: params.data })
    if (params.callback && data && data === true) {
        params.callback(data, error)
    }
    dispatch(fetchData({ ...getState().administrative.params, query: params.query }))

    return data
})

// ** Suspend User
export const disableUser = createAsyncThunk("appAdministratives/disableUser", async (params: DataAddParams, { getState, dispatch }: Redux) => {
    const { data, error } = await useLazyDisableAdministrativeById({ mutate: params.mutate, values: params.data })
    if (params.callback) {
        params.callback(data, error)
    }
    dispatch(fetchData({ ...getState().administrative.params, query: params.query }))

    return data
})

// ** Delete User
export const deleteUser = createAsyncThunk("appAdministratives/deleteUser", async (params: DataAddParams, { getState, dispatch }: Redux) => {
    const { data, error } = await useLazyDeleteAdministrativeById({ mutate: params.mutate, values: params.data })
    if (params.callback) {
        params.callback(data, error)
    }
    dispatch(fetchData({ ...getState().administrative.params, query: params.query }))

    return data
})

export const appAdministrativesSlice = createSlice({
    name: "appAdministratives",
    initialState: {
        data: [] as Administrative[],
        total: 1,
        params: {},
        allData: [] as Administrative[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload.users
            state.total = action.payload.total
            state.params = action.payload.params
            state.allData = action.payload.allData
        })
    },
})

export default appAdministrativesSlice.reducer
