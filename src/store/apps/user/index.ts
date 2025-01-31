// ** Redux Imports
import { Dispatch } from "redux"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ** Axios Imports
import { useLazyCreateEmployee, useLazyGetAllEmployee, useLazyDeleteEmployeeById } from "src/services/graphql/hooks/employee"
import { Employee } from "src/services/graphql/types"

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
export const fetchData = createAsyncThunk("appUsers/fetchData", async (params: DataParams) => {
    const { data } = await useLazyGetAllEmployee({ query: params.query })

    if (data) {
        return {
            allData: data.results ? data.results : ([] as Employee[]),
            users: data.results ? data.results : ([] as Employee[]),
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
export const addUser = createAsyncThunk("appUsers/addUser", async (params: DataAddParams, { getState, dispatch }: Redux) => {
    const { data, error } = await useLazyCreateEmployee({ mutate: params.mutate, values: params.data })

    if (params.callback && data && data === true) {
        params.callback(data, error)
    }
    dispatch(fetchData({ ...getState().user.params, query: params.query }))

    return data
})

// ** Delete User
export const deleteUser = createAsyncThunk("appUsers/deleteUser", async (params: DataAddParams, { getState, dispatch }: Redux) => {
    const { data, error } = await useLazyDeleteEmployeeById({ mutate: params.mutate, values: params.data })

    dispatch(fetchData({ ...getState().user.params, query: params.query }))

    return data
})

export const appUsersSlice = createSlice({
    name: "appUsers",
    initialState: {
        data: [] as Employee[],
        total: 1,
        params: {},
        allData: [] as Employee[],
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

export default appUsersSlice.reducer
