import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Game, Round } from '../models/game';

const gameAdaptor = createEntityAdapter<Game>();

const gameSlice = createSlice({
  name: 'game',
  initialState: gameAdaptor.getInitialState(),
  reducers: {
    createGame: (
      state,
      action: PayloadAction<Pick<Game, 'name' | 'betSize' | 'playerNames'>>,
    ) => {
      const { name, betSize, playerNames } = action.payload;
      gameAdaptor.addOne(state, {
        id: nanoid(),
        name,
        betSize,
        playerNames,
        rounds: [],
        timestamp: new Date(),
      });
    },
    addRound: (
      state,
      action: PayloadAction<{
        data: Pick<Round, 'stats'>;
        gameId: string;
      }>,
    ) => {
      const { data, gameId } = action.payload;
      const { rounds } = gameAdaptor.getSelectors().selectById(state, gameId);
      gameAdaptor.updateOne(state, {
        id: gameId,
        changes: {
          rounds: [
            ...rounds,
            {
              id: nanoid(),
              timestamp: new Date(),
              stats: data.stats,
            },
          ],
        },
      });
    },
  },
});

export const { createGame, addRound } = gameSlice.actions;
export default gameSlice;
