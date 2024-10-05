import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Game } from '../models/game';

export const gameAdaptor = createEntityAdapter<Game>();

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
  },
});

export const { createGame } = gameSlice.actions;
export default gameSlice;
