import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Game } from '../models/game';

const gameAdaptor = createEntityAdapter<Game>();

const gameSlice = createSlice({
  name: 'game',
  initialState: gameAdaptor.getInitialState(),
  reducers: {
    createGame: (
      state,
      action: PayloadAction<Omit<Game, 'id' | 'receiptIds'>>,
    ) => {
      const { name, betSize, playerIds } = action.payload;
      gameAdaptor.addOne(state, {
        id: nanoid(),
        name,
        betSize,
        playerIds,
        receiptIds: [],
      });
    },
    updateGame: gameAdaptor.updateOne,
    deleteGame: gameAdaptor.removeOne,
  },
});

export default gameSlice;
