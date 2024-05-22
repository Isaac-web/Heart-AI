export const shortenString = (string: string, maxLength: number): string => {
  if (string.length > maxLength) return string.slice(0, maxLength) + '...';

  return string;
};
