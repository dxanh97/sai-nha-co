import { configureStore } from '@reduxjs/toolkit';

import gameSlice from './game.slice';
import playerSlice from './player.slice';

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    player: playerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
