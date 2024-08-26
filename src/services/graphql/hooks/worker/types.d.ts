import { Result } from "../../customType"
import { WorkerResults, SearchWorkerInp, CreateWorkerInp, Worker, Attendance, MarkAttendanceInput } from "../../types"

export type WorkersResult = Result<WorkerResults>
export type WorkerResult = Result<Worker>
export type WorkerListIdResult = Result<string>
export type MarkAttendanceInput = MarkAttendanceInput
export type SearchWorkerInp = SearchWorkerInp
export type CreateWorkerInp = CreateWorkerInp
export type Attendance = Attendance
