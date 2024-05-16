import { jwtDecode } from 'jwt-decode';

export const getUserId = (): string | undefined => {
  const token = localStorage.getItem('auth-token');
  if (!token) return '';

  try {
    const decoded = jwtDecode(token) as { _id: string };

    return decoded._id;
  } catch (err) {
    console.log('Somthing went wrong while decoding token.');
  }
};
