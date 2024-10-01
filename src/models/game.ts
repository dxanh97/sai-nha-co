export interface Game {
  id: string;
  timestamp: Date;
  name: string;
  betSize: number;
  playerNames: string[];
  rounds: Round[];
}

export interface Round {
  id: string;
  timestamp: Date;
  stats: {
    [playerName: string]: number;
  };
}
