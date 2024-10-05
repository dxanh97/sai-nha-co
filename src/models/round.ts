export interface Round {
  id: string;
  gameId: string;
  timestamp: Date;
  stats: {
    [playerName: string]: number;
  };
}
