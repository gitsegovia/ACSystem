export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
    email: string
    password: string
    rememberMe?: boolean
}

export type UserDataType = {
    id: number
    role: string
    email: string
    phone: string
    fullName: string
    username: string
    gender: string
    password: string
    avatar?: string | null
    codeUser: string
}

export type AuthValuesType = {
    loading: boolean
    logout: () => void
    setLoading: (value: boolean) => void
    login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
