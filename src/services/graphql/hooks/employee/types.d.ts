import { Result } from "../../customType"
import { EmployeeResults, SearchEmployeeInp, CreateEmployeeInp, Employee } from "../../types"

export type EmployeesResult = Result<EmployeeResults>
export type EmployeeResult = Result<Employee>
export type EmployeeListIdResult = Result<string>
export type SearchEmployeeInp = SearchEmployeeInp
export type CreateEmployeeInp = CreateEmployeeInp
