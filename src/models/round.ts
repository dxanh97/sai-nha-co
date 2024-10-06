export interface Round {
  id: string;
  gameId: string;
  timestamp: number;
  stats: {
    [playerName: string]: number;
  };
}
