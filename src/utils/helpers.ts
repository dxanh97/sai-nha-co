export const getColor = (n: number) => {
  if (n > 0) return 'green';
  if (n < 0) return 'red';
  return '';
};

export const formatNumber = (n: number) => (n > 0 ? `+${n}` : `${n}`);

export const getSum = (list: number[]) => {
  const sum = list.reduce((acc, cur) => acc + cur, 0);
  return sum;
};

export const formatDateTime = (t: number) => {
  const date = new Date(t);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const dateString = `${d < 10 ? `0${d}` : d}-${m}-${y}`;
  const timeString = `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}`;
  return `${dateString} ${timeString}`;
};
