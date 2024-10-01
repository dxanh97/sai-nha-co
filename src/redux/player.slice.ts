import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Player } from '../models/player';

const playerAdaptor = createEntityAdapter<Player>();

const playerSlice = createSlice({
  name: 'player',
  initialState: playerAdaptor.getInitialState(),
  reducers: {
    createPlayer: (state, action: PayloadAction<Omit<Player, 'id'>>) => {
      const { name } = action.payload;
      playerAdaptor.addOne(state, {
        id: nanoid(),
        name,
      });
    },
    updatePlayer: (state, action: PayloadAction<Player>) => {
      const { id, name } = action.payload;
      playerAdaptor.updateOne(state, { changes: { name }, id });
    },
  },
});

export default playerSlice;
