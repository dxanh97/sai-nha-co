export const getColor = (n: number) => {
  if (n > 0) return 'green';
  if (n < 0) return 'red';
  return '';
};

export const formatNumber = (n: number) => {
  if (n > 0) return `+${n}`;
  return n;
};

export const getSum = (list: number[]) => {
  const sum = list.reduce((acc, cur) => acc + cur, 0);
  return sum;
};
