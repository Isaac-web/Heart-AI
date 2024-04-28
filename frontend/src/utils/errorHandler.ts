import { AxiosError } from 'axios';

export const getErrorMessage = (
  error: AxiosError<{ message?: string }>
): string | null => {
  if (!error) return null;

  if (!error.response) return error.message;

  return error.response.data.message || null;
};

export const handleError = (err: Error): string => {
  if (err instanceof AxiosError) {
    const message = getErrorMessage(err);
    if (message) return message;
  }
  return 'Something went wrong.';
};
