import { createSelector } from '@reduxjs/toolkit';
import { gameAdaptor } from './game.slice';
import { RootState } from './store';

export const gameSelector = gameAdaptor.getSelectors<RootState>((s) => s.game);

export const selectAllGames = (s: RootState) => gameSelector.selectAll(s);

export const selectGameById = createSelector(
  [(s: RootState) => s, (_, id: string) => id],
  (s, id) => gameSelector.selectById(s, id),
);
