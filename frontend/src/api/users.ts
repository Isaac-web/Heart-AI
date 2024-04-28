import { User, UsersSearchParams } from '@/types';
import { apiClient } from './apiClient';

export const fetchUsers = async (params: UsersSearchParams = {}) => {
  const { data: resData } = await apiClient.get<{ data: User[] }>('/users', {
    params,
  });

  return resData.data;
};
