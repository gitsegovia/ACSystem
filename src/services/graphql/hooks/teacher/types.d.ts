import { Result } from "../../customType"
import { TeacherResults, SearchTeacherInp, CreateTeacherInp, Teacher, Attendance, MarkAttendanceInput } from "../../types"

export type TeachersResult = Result<TeacherResults>
export type TeacherResult = Result<Teacher>
export type TeacherListIdResult = Result<string>
export type MarkAttendanceInput = MarkAttendanceInput
export type SearchTeacherInp = SearchTeacherInp
export type CreateTeacherInp = CreateTeacherInp
export type Attendance = Attendance
