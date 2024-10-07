import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Game } from '../models/game';

export const gameAdaptor = createEntityAdapter<Game>({
  sortComparer: (a, b) => b.timestamp - a.timestamp,
});

const gameSlice = createSlice({
  name: 'game',
  initialState: gameAdaptor.getInitialState(),
  reducers: {
    createGame: (state, action: PayloadAction<Omit<Game, 'timestamp'>>) => {
      const { id, name, betSize, playerNames } = action.payload;
      gameAdaptor.addOne(state, {
        id,
        name,
        betSize,
        playerNames,
        timestamp: new Date().getTime(),
      });
    },
    deleteGame: gameAdaptor.removeOne,
    updateGameName: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      const { id, name } = action.payload;
      gameAdaptor.updateOne(state, {
        id,
        changes: { name },
      });
    },
  },
});

export const { createGame, deleteGame, updateGameName } = gameSlice.actions;
export default gameSlice;
