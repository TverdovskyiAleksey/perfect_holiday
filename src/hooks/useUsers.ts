import { useQuery } from 'react-query';
import axios from 'axios';
import { Role, url } from 'constants/constants';
import { IUserId, TBookkHoliday, User, TApprovedDay, TDeleteUser } from './types';
import { TUpdateUser } from 'views/AdminView/types';
import store from 'Redux/store';
import { UserValues } from 'Components/AddUserModal/types';

const { REACT_APP_BASE } = process.env;

export default function useGetListOfUsers() {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  const role = state.person.user.role;
  return useQuery('users', async (): Promise<Array<User>> => {
    const { data } = await axios.get(
      `${REACT_APP_BASE}${url.users}${
        role === Role.SUPER ? url.forsuper : url.foradmin
      }`,
      {
        headers: { Authorization: token },
      },
    );
    return data;
  });
}

export function useAllNotApprovedRestDays() {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  return useQuery('casual', async (): Promise<Array<User>> => {
    const { data } = await axios.get(`${REACT_APP_BASE}${url.pending}`, {
      headers: { Authorization: token },
    });
    return data;
  });
}

export const toBlockUnblockUser = async (dataIndex: boolean, key: IUserId) => {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  axios.put(
    `${REACT_APP_BASE}${url.users}${key.id}`,
    {
      is_block: !dataIndex,
    },
    {
      headers: { Authorization: token },
    },
  );
};

export const toUpdateUserInfo = async (values: TUpdateUser, userId: string) => {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  return axios.put(`${REACT_APP_BASE}${url.users}${userId}`, values, {
    headers: { Authorization: token },
  });
};

export const bookigRestDays = async (values: TBookkHoliday, userId: string) => {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  return axios.post(`${REACT_APP_BASE}${url.casual}${userId}`, values, {
    headers: { Authorization: token },
  });
};

export const toApprovedOrDisapproveRestDay = async (values: TApprovedDay) => {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  return axios.put(`${REACT_APP_BASE}${url.casual}`, values, {
    headers: { Authorization: token },
  });
};

export const toAddOnlyEmployee = async (values: UserValues) => {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  return axios.post(`${REACT_APP_BASE}${url.users}`, values, {
    headers: { Authorization: token },
  });
};

export function useGetUserData() {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  return useQuery('users', async userId => {
    const { data } = await axios.get(`${REACT_APP_BASE}${url.casual}${userId}`, {
      headers: { Authorization: token },
    });
    return data;
  });
}

export function getUserRequestDays(userId: string) {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  return useQuery('casual', async (): Promise<Array<User>> => {
    const { data } = await axios.get(`${REACT_APP_BASE}${url.casual}${userId}`, {
      headers: { Authorization: token },
    });
    return data;
  });
}

export const toEditRestDays = async (values: any) => {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  return axios.put(`${REACT_APP_BASE}${url.casual}editing`, values, {
    headers: { Authorization: token },
  });
};

export const toDeleteUser = async (values: TDeleteUser) => {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  return axios.delete(`${REACT_APP_BASE}${url.users}${values.id}`, {
    headers: { Authorization: token },
  });
};
