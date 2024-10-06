import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Round } from '../models/round';

export const roundAdaptor = createEntityAdapter<Round>({
  sortComparer: (a, b) => b.timestamp - a.timestamp,
});

const roundSlice = createSlice({
  name: 'round',
  initialState: roundAdaptor.getInitialState(),
  reducers: {
    createRound: (
      state,
      action: PayloadAction<Omit<Round, 'id' | 'timestamp'>>,
    ) => {
      const { gameId, stats } = action.payload;
      roundAdaptor.addOne(state, {
        id: nanoid(),
        gameId,
        stats,
        timestamp: new Date().getTime(),
      });
    },
  },
});

export const { createRound } = roundSlice.actions;
export default roundSlice;
