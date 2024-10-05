import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Round } from '../models/round';

export const roundAdaptor = createEntityAdapter<Round>({
  sortComparer: (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
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
        timestamp: new Date(),
      });
    },
  },
});

export const { createRound } = roundSlice.actions;
export default roundSlice;
