/* eslint-disable import/prefer-default-export */

export const getColor = (n: number) => {
  if (n > 0) return 'green';
  if (n < 0) return 'red';
  return '';
};
