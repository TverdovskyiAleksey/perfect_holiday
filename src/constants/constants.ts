import { APPROVED, DECLINED, CHANGED } from './statuses';

export enum Role {
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
  SUPER = 'super',
}

export const url = {
  users: 'users/',
  admin: 'admin/',
  login: 'login/',
  auth: 'auth/',
  casual: 'casual/',
  mail: 'mail/',
  editing: 'editing/',
  pushPassword: 'push-password/',
  pending: 'casual/pending',
  forsuper: 'admin-employee',
  foradmin: 'employee',
};

export const sellectItemColor = (status: string) => {
  if (status === DECLINED) {
    return 'red';
  } else if (status === APPROVED) {
    return 'green';
  } else if (status === CHANGED) {
    return 'blue';
  }
  return 'yellow';
};

export const checkIsBlock = (block: boolean) => {
  if (block) {
    return 'gray-color';
  }
  return '';
};
