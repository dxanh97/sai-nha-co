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
    updateRound: (
      state,
      action: PayloadAction<Pick<Round, 'id' | 'stats'>>,
    ) => {
      const { id, stats } = action.payload;
      roundAdaptor.updateOne(state, {
        id,
        changes: { stats },
      });
    },
    deleteRound: roundAdaptor.removeOne,
  },
});

export const { createRound, updateRound, deleteRound } = roundSlice.actions;
export default roundSlice;
