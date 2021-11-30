import { useQuery } from 'react-query';
import axios from 'axios';
import { url } from 'constants/constants';
import { IUserId, TBookkHoliday, User, TApprovedDay } from './types';
import { TUpdateUser } from 'views/AdminView/types';
import store from 'Redux/store';
const { REACT_APP_BASE } = process.env;

export default function useGetListOfUsers() {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  return useQuery('users', async (): Promise<Array<User>> => {
    const { data } = await axios.get(`${REACT_APP_BASE}${url.users}`, {
      headers: { Authorization: token },
    });
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

export const getUserRequestDays = async (userId: string) => {
  const state = store.getState();
  const token = `Bearer ${state.person.user.access_token}`;
  return useQuery('casual', async (): Promise<Array<User>> => {
    const { data } = await axios.get(`${REACT_APP_BASE}${url.casual}${userId}`, {
      headers: { Authorization: token },
    });
    return data;
  });
};
