import { jwtDecode } from 'jwt-decode';

export const getUserId = (): string => {
  const token = localStorage.getItem('auth-token');
  if (!token) return '';

  const decoded = jwtDecode(token) as { _id: string };

  return decoded._id;
};
