// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react"

// ** Next Import
import { useRouter } from "next/router"

// ** Config
import authConfig from "src/configs/auth"

// Hooks
import DataQueryLogin from "src/services/dataQueryClient/hooks/login"

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from "src/context/types"
import { SystemConnect } from "src/services/graphql/types"

import { useLazyLogin } from "src/services/graphql/hooks/login"
import { useApolloClient } from "@apollo/client"

interface UserEmployeeDataType extends UserDataType {
    position: string
}
interface AuthEmployeeValueType extends AuthValuesType {
    user: UserEmployeeDataType | null
    setUser: (value: UserEmployeeDataType | null) => void
}

// ** Defaults
const defaultProvider: AuthEmployeeValueType = {
    user: null,
    loading: true,
    setUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
    // ** States
    const [user, setUser] = useState<UserEmployeeDataType | null>(defaultProvider.user)
    const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

    // ** Hooks
    const router = useRouter()

    const { mutate } = useApolloClient()
    // ** Vars
    const dataQueryLogin = DataQueryLogin.getInstance()
    const useLazyMe = dataQueryLogin.useLazyMe()

    useEffect(() => {
        const initAuth = async (): Promise<void> => {
            const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
            if (storedToken) {
                setLoading(true)
                try {
                    const { data, error } = await useLazyMe({
                        token: storedToken,
                        onTokenExpiration: authConfig.onTokenExpiration,
                    })

                    if (data && data.user.Employee) {
                        const dataUser: UserEmployeeDataType = {
                            id: data.user.id,
                            position: data.user.Employee.position,
                            role: data.user.Employee.role,
                            password: "",
                            phone: data.user.phone,
                            email: data.user.email,
                            fullName: `${data.user.Employee.firstName} ${data.user.Employee.lastName}`,
                            username: data.user.nameUser,
                            gender: data.user.Employee.gender,
                            avatar: data.user.Employee.photo,
                            codeUser: data.user.Employee.numberEmployee.toString() ?? Math.random().toString(),
                        }
                        setUser(dataUser)
                        window.localStorage.setItem(authConfig.storageTokenKeyName, data.token)
                        window.localStorage.setItem("userData", JSON.stringify(dataUser))
                        setLoading(false)
                    } else {
                        localStorage.removeItem("userData")
                        localStorage.removeItem("refreshToken")
                        localStorage.removeItem(authConfig.storageTokenKeyName)
                        setUser(null)
                        if (!router.pathname.includes("login")) {
                            router.replace("/login")
                        }
                        setLoading(false)
                    }
                } catch (error) {
                    localStorage.removeItem("userData")
                    localStorage.removeItem("refreshToken")
                    localStorage.removeItem(authConfig.storageTokenKeyName)
                    setUser(null)
                    setLoading(false)
                    if (!router.pathname.includes("login")) {
                        router.replace("/login")
                    }
                }
            } else {
                setLoading(false)
            }
        }

        initAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
        setLoading(true)
        useLazyLogin({
            mutate,
            values: {
                email: params.email,
                password: params.password,
                systemConnect: SystemConnect.Web,
            },
        })
            .then(async ({ data, error }) => {
                if (data && data.user.Employee) {
                    params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, data.token) : null
                    const returnUrl = router.query.returnUrl

                    const dataUser: UserEmployeeDataType = {
                        fullName: `${data.user.Employee.firstName} ${data.user.Employee.lastName}`,
                        position: data.user.Employee.position,
                        role: data.user.Employee.role,
                        id: data.user.id,
                        email: data.user.email,
                        phone: data.user.phone,
                        username: data.user.nameUser,
                        gender: data.user.Employee.gender,
                        password: "",
                        avatar: data.user.Employee.photo,
                        codeUser: data.user.Employee.numberEmployee.toString() ?? Math.random().toString(),
                    }

                    setUser(dataUser)
                    if (params.rememberMe) {
                        window.localStorage.setItem(authConfig.storageTokenKeyName, data.token)
                        window.localStorage.setItem("userData", JSON.stringify(dataUser))
                    }

                    const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/"

                    router.replace(redirectURL as string)
                }
                if (error !== null) {
                    setLoading(false)
                    if (errorCallback) errorCallback({ err: error })
                }
            })
            .catch((err) => {
                console.error(err)
                if (errorCallback) errorCallback(err)
            })
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem("userData")
        window.localStorage.removeItem(authConfig.storageTokenKeyName)
        router.push("/login")
    }

    const values = {
        user,
        loading,
        setUser,
        setLoading,
        login: handleLogin,
        logout: handleLogout,
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
