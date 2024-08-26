// ** Redux Imports
import { Dispatch } from "redux"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ** Axios Imports
import { useLazyCreateWorker, useLazyGetAllWorker, useLazyDisableWorkerById, useLazyDeleteWorkerById } from "src/services/graphql/hooks/worker"
import { Worker } from "src/services/graphql/types"

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
export const fetchData = createAsyncThunk("appWorkers/fetchData", async (params: DataParams) => {
    // const response = await axios.get('/apps/users/list', {
    //   params
    // })

    const { data } = await useLazyGetAllWorker({ query: params.query })

    if (data) {
        return {
            allData: data.results ? data.results : ([] as Worker[]),
            users: data.results ? data.results : ([] as Worker[]),
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
export const addUser = createAsyncThunk("appWorkers/addUser", async (params: DataAddParams, { getState, dispatch }: Redux) => {
    // const response = await axios.post("/apps/users/add-user", {
    //     data,
    // })

    const { data, error } = await useLazyCreateWorker({ mutate: params.mutate, values: params.data })
    if (params.callback && data && data === true) {
        params.callback(data, error)
    }
    dispatch(fetchData({ ...getState().worker.params, query: params.query }))

    return data
})

// ** Suspend User
export const disableUser = createAsyncThunk("appWorkers/disableUser", async (params: DataAddParams, { getState, dispatch }: Redux) => {
    const { data, error } = await useLazyDisableWorkerById({ mutate: params.mutate, values: params.data })
    if (params.callback) {
        params.callback(data, error)
    }
    dispatch(fetchData({ ...getState().worker.params, query: params.query }))

    return data
})

// ** Delete User
export const deleteUser = createAsyncThunk("appWorkers/deleteUser", async (params: DataAddParams, { getState, dispatch }: Redux) => {
    const { data, error } = await useLazyDeleteWorkerById({ mutate: params.mutate, values: params.data })

    if (params.callback) {
        params.callback(data, error)
    }
    dispatch(fetchData({ ...getState().worker.params, query: params.query }))

    return data
})

export const appWorkersSlice = createSlice({
    name: "appWorkers",
    initialState: {
        data: [] as Worker[],
        total: 1,
        params: {},
        allData: [] as Worker[],
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

export default appWorkersSlice.reducer
