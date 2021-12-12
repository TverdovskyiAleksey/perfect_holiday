export type TRole = 'super' | 'admin' | 'employee' | '';

export interface IUser {
  id: string;
  access_token: string;
  role: TRole;
  name: string;
  sickDays: number;
  vacationDays: number;
}

export interface IPermission {
  readonly rejectDaysOff?: boolean;
  readonly approveDaysOff?: boolean;
  readonly editOwnDaysOff?: boolean;
  readonly editEmployeesDaysOff?: boolean;
  readonly seeDashboard?: boolean;
  readonly seeUsersList?: boolean;
  readonly createUser?: boolean;
  readonly updateUser?: boolean;
  readonly deleteUser?: boolean;
  readonly sendPassword?: boolean;
  readonly blockUser?: boolean;
  readonly unblockUser?: boolean;
}
