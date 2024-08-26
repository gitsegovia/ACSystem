import { Result } from "../../customType"
import { AdministrativeResults, SearchAdministrativeInp, CreateAdministrativeInp, Administrative, Attendance, MarkAttendanceInput } from "../../types"

export type AdministrativesResult = Result<AdministrativeResults>
export type AdministrativeResult = Result<Administrative>
export type AdministrativeListIdResult = Result<string>
export type MarkAttendanceInput = MarkAttendanceInput
export type SearchAdministrativeInp = SearchAdministrativeInp
export type CreateAdministrativeInp = CreateAdministrativeInp
export type Attendance = Attendance
