export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Datatime: { input: any; output: any };
  Date: { input: any; output: any };
  Time: { input: any; output: any };
  UUID: { input: any; output: any };
};

export type Administrative = {
  __typename?: "Administrative";
  Attendance?: Maybe<Array<Maybe<Attendance>>>;
  active: Scalars["Boolean"]["output"];
  address: Scalars["String"]["output"];
  codeQr: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  gender: Scalars["String"]["output"];
  id: Scalars["UUID"]["output"];
  idnDni: Scalars["String"]["output"];
  lastName: Scalars["String"]["output"];
  numberAdministrative: Scalars["Int"]["output"];
  phone: Scalars["String"]["output"];
  position: Scalars["String"]["output"];
  typeDni: Scalars["String"]["output"];
};

export type AdministrativeResults = {
  __typename?: "AdministrativeResults";
  infoPage?: Maybe<InfoPage>;
  results?: Maybe<Array<Administrative>>;
};

export type Attendance = {
  __typename?: "Attendance";
  Administrative?: Maybe<Administrative>;
  Teacher?: Maybe<Teacher>;
  Worker?: Maybe<Worker>;
  day?: Maybe<Scalars["Date"]["output"]>;
  hourWork?: Maybe<Scalars["Float"]["output"]>;
  id: Scalars["UUID"]["output"];
  in?: Maybe<Scalars["Time"]["output"]>;
  out?: Maybe<Scalars["Time"]["output"]>;
};

export type AttendanceResults = {
  __typename?: "AttendanceResults";
  infoPage?: Maybe<InfoPage>;
  results?: Maybe<Array<Attendance>>;
};

export type AuthPayLoad = {
  __typename?: "AuthPayLoad";
  token: Scalars["String"]["output"];
  user: User;
};

export type CreateAdministrativeInp = {
  address: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  gender: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  idnDni: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  position: Scalars["String"]["input"];
};

export type CreateEmployeeInp = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  gender: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  idnDni: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  position: Scalars["String"]["input"];
  role: Scalars["String"]["input"];
};

export type CreateTeacherInp = {
  address: Scalars["String"]["input"];
  condition: Scalars["String"]["input"];
  dedication: Scalars["String"]["input"];
  department: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  gender: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  idnDni: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  position: Scalars["String"]["input"];
  scale: Scalars["String"]["input"];
};

export type CreateWorkerInp = {
  address: Scalars["String"]["input"];
  condition: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  gender: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  idnDni: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
};

export enum DirectionOrderBy {
  Asc = "ASC",
  Desc = "DESC",
}

export type Employee = {
  __typename?: "Employee";
  User: User;
  active: Scalars["Boolean"]["output"];
  address?: Maybe<Scalars["String"]["output"]>;
  birthDate: Scalars["Datatime"]["output"];
  codeCountryPhone: Scalars["String"]["output"];
  contractAccepted: Scalars["Boolean"]["output"];
  coordinator: Scalars["Boolean"]["output"];
  dniImg: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  gender: Scalars["String"]["output"];
  id: Scalars["UUID"]["output"];
  idnDni: Scalars["String"]["output"];
  lastName: Scalars["String"]["output"];
  nameMessage?: Maybe<Scalars["String"]["output"]>;
  numberEmployee: Scalars["Int"]["output"];
  phone: Scalars["String"]["output"];
  photo: Scalars["String"]["output"];
  position: Scalars["String"]["output"];
  role: Scalars["String"]["output"];
  signature?: Maybe<Scalars["String"]["output"]>;
  typeDni: Scalars["String"]["output"];
};

export type EmployeeResults = {
  __typename?: "EmployeeResults";
  infoPage?: Maybe<InfoPage>;
  results?: Maybe<Array<Employee>>;
};

export type InfoPage = {
  __typename?: "InfoPage";
  count: Scalars["Int"]["output"];
  current: Scalars["Int"]["output"];
  next: Scalars["Boolean"]["output"];
  pages: Scalars["Int"]["output"];
  prev: Scalars["Boolean"]["output"];
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  systemConnect: SystemConnect;
};

export type MarkAttendanceInput = {
  codeQr: Scalars["String"]["input"];
  typeMark: Scalars["String"]["input"];
  dependence: Scalars["Int"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createAdmin: Scalars["Boolean"]["output"];
  createAdministrative: Scalars["Boolean"]["output"];
  createEmployee: Scalars["Boolean"]["output"];
  createTeacher: Scalars["Boolean"]["output"];
  createWorker: Scalars["Boolean"]["output"];
  deleteAdministrativeById: Scalars["Boolean"]["output"];
  deleteEmployeeById: Scalars["Boolean"]["output"];
  deleteTeacherById: Scalars["Boolean"]["output"];
  deleteWorkerById: Scalars["Boolean"]["output"];
  disableAdministrativeById: Scalars["Boolean"]["output"];
  disableTeacherById: Scalars["Boolean"]["output"];
  disableWorkerById: Scalars["Boolean"]["output"];
  loginEmployee: AuthPayLoad;
  markAttendanceAdministrative: Attendance;
  markAttendanceTeacher: Attendance;
  markAttendanceWorker: Attendance;
  me: AuthPayLoad;
};

export type MutationCreateAdministrativeArgs = {
  input: CreateAdministrativeInp;
};

export type MutationCreateEmployeeArgs = {
  input: CreateEmployeeInp;
};

export type MutationCreateTeacherArgs = {
  input: CreateTeacherInp;
};

export type MutationCreateWorkerArgs = {
  input: CreateWorkerInp;
};

export type MutationDeleteAdministrativeByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationDeleteEmployeeByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationDeleteTeacherByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationDeleteWorkerByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationDisableAdministrativeByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationDisableTeacherByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationDisableWorkerByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationLoginEmployeeArgs = {
  input: LoginInput;
};

export type MutationMarkAttendanceAdministrativeArgs = {
  input: MarkAttendanceInput;
};

export type MutationMarkAttendanceTeacherArgs = {
  input: MarkAttendanceInput;
};

export type MutationMarkAttendanceWorkerArgs = {
  input: MarkAttendanceInput;
};

export type MutationMeArgs = {
  onTokenExpiration?: InputMaybe<Scalars["String"]["input"]>;
  token: Scalars["String"]["input"];
};

export type OptionsFilterBasic = {
  area_level_1?: InputMaybe<Scalars["String"]["input"]>;
  area_level_2?: InputMaybe<Scalars["String"]["input"]>;
  area_level_3?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["UUID"]["input"]>;
  userLatitude?: InputMaybe<Scalars["String"]["input"]>;
  userLocation?: InputMaybe<Scalars["String"]["input"]>;
  userLongitude?: InputMaybe<Scalars["String"]["input"]>;
};

export type OptionsSearch = {
  currentPage?: InputMaybe<Scalars["Int"]["input"]>;
  direction?: InputMaybe<Array<DirectionOrderBy>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type Query = {
  __typename?: "Query";
  dataEmployeeByUserId: User;
  getAllAdministrative: AdministrativeResults;
  getAllAttendance: AttendanceResults;
  getAllEmployee: EmployeeResults;
  getAllIdAdministrative?: Maybe<Array<Scalars["UUID"]["output"]>>;
  getAllIdEmployee?: Maybe<Array<Scalars["UUID"]["output"]>>;
  getAllIdTeacher?: Maybe<Array<Scalars["UUID"]["output"]>>;
  getAllIdWorker?: Maybe<Array<Scalars["UUID"]["output"]>>;
  getAllTeacher: TeacherResults;
  getAllWorker: WorkerResults;
  getAttendanceToDay?: Maybe<Array<Attendance>>;
  getAttendanceToWeek?: Maybe<Array<Attendance>>;
  getDataAdministrativeById: Administrative;
  getDataEmployeeById: Employee;
  getDataTeacherById: Teacher;
  getDataWorkerById: Worker;
  getUsersAll?: Maybe<UserResults>;
};

export type QueryDataEmployeeByUserIdArgs = {
  userId: Scalars["UUID"]["input"];
};

export type QueryGetAllAdministrativeArgs = {
  search: SearchAdministrativeInp;
};

export type QueryGetAllAttendanceArgs = {
  search: SearchAttendanceInp;
};

export type QueryGetAllEmployeeArgs = {
  search: SearchEmployeeInp;
};

export type QueryGetAllTeacherArgs = {
  search: SearchTeacherInp;
};

export type QueryGetAllWorkerArgs = {
  search: SearchWorkerInp;
};

export type QueryGetDataAdministrativeByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryGetDataEmployeeByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryGetDataTeacherByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryGetDataWorkerByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryGetUsersAllArgs = {
  search?: InputMaybe<SearchUserInput>;
};

export type SearchAdministrativeInp = {
  options?: InputMaybe<OptionsSearch>;
};

export type SearchAttendanceInp = {
  dateEnd?: InputMaybe<Scalars["Date"]["input"]>;
  dateStart?: InputMaybe<Scalars["Date"]["input"]>;
  options?: InputMaybe<OptionsSearch>;
};

export type SearchEmployeeInp = {
  options?: InputMaybe<OptionsSearch>;
};

export type SearchTeacherInp = {
  options?: InputMaybe<OptionsSearch>;
};

export type SearchUserInput = {
  options?: InputMaybe<OptionsSearch>;
};

export type SearchWorkerInp = {
  options?: InputMaybe<OptionsSearch>;
};

export enum SystemConnect {
  App = "App",
  Web = "Web",
}

export type Teacher = {
  __typename?: "Teacher";
  Attendance?: Maybe<Array<Maybe<Attendance>>>;
  active: Scalars["Boolean"]["output"];
  address: Scalars["String"]["output"];
  codeQr: Scalars["String"]["output"];
  condition: Scalars["String"]["output"];
  dedication: Scalars["String"]["output"];
  department?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  gender: Scalars["String"]["output"];
  id: Scalars["UUID"]["output"];
  idnDni: Scalars["String"]["output"];
  lastName: Scalars["String"]["output"];
  numberTeacher: Scalars["Int"]["output"];
  phone: Scalars["String"]["output"];
  position?: Maybe<Scalars["String"]["output"]>;
  scale: Scalars["String"]["output"];
  typeDni: Scalars["String"]["output"];
};

export type TeacherResults = {
  __typename?: "TeacherResults";
  infoPage?: Maybe<InfoPage>;
  results?: Maybe<Array<Teacher>>;
};

export type User = {
  __typename?: "User";
  Employee?: Maybe<Employee>;
  codeCountryPhone: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["UUID"]["output"];
  nameUser: Scalars["String"]["output"];
  phone: Scalars["String"]["output"];
  status: Scalars["String"]["output"];
};

export type UserResults = {
  __typename?: "UserResults";
  infoPage?: Maybe<InfoPage>;
  results?: Maybe<Array<User>>;
};

export type Worker = {
  __typename?: "Worker";
  Attendance?: Maybe<Array<Maybe<Attendance>>>;
  active: Scalars["Boolean"]["output"];
  address: Scalars["String"]["output"];
  codeQr: Scalars["String"]["output"];
  condition: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  gender: Scalars["String"]["output"];
  id: Scalars["UUID"]["output"];
  idnDni: Scalars["String"]["output"];
  lastName: Scalars["String"]["output"];
  numberWorker: Scalars["Int"]["output"];
  phone: Scalars["String"]["output"];
  typeDni: Scalars["String"]["output"];
};

export type WorkerResults = {
  __typename?: "WorkerResults";
  infoPage?: Maybe<InfoPage>;
  results?: Maybe<Array<Worker>>;
};
