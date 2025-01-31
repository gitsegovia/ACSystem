import { Result } from "../../customType"
import { LoginInput } from "../../types"

export type AuthPayLoad = {
    token: string
    user: any
}

export type MeResult = Result<AuthPayLoad>
export type MeInput = { token: String; onTokenExpiration: string }
export type LoginInput = LoginInput
