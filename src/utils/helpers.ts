import { Round } from '../models/round';

export const getColor = (n: number) => {
  if (n > 0) return 'green';
  if (n < 0) return 'red';
  return 'grey';
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

export const calculateRoundResultsHistory = (
  rounds: Round[],
  playerNames: string[],
) => {
  const orderedRounds = [...rounds].sort((a, b) => a.timestamp - b.timestamp);
  const resultHistory = orderedRounds.reduce<{
    [playerName: string]: number[];
  }>((acc, cur) => {
    const result = playerNames.reduce((roundResultMap, name) => {
      const playerHistory = acc[name] ?? [0];
      const currentRoundStat = cur.stats[name] ?? 0;
      return {
        ...roundResultMap,
        [name]: [
          ...playerHistory,
          playerHistory[playerHistory.length - 1] + currentRoundStat,
        ],
      };
    }, {});
    return result;
  }, {});

  return resultHistory;
};

export const calculateRanking = (roundResultHistory: {
  [playerName: string]: number[];
}) => {
  const resultList = Object.keys(roundResultHistory).map((name) => {
    const history = roundResultHistory[name];
    return {
      name,
      stat: history[history.length - 1],
    };
  });
  resultList.sort((a, b) => b.stat - a.stat);
  return resultList;
};

export const getSummaryText = (
  ranking: Array<{
    name: string;
    stat: number;
  }>,
) => {
  const text = ranking
    .map((x) => `${x.name}: ${formatNumber(x.stat)}`)
    .map((s) => `${s}\n`)
    .join('');
  return text;
};
