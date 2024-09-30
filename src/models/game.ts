import { Player } from './player';
import { Receipt } from './receipt';

export interface Game {
  id: string;
  betSize: number;
  players: Player[];
  receipts: Receipt[];
}
