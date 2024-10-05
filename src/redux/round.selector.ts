import { createSelector } from '@reduxjs/toolkit';
import { roundAdaptor } from './round.slice';
import { RootState } from './store';

const roundSelector = roundAdaptor.getSelectors<RootState>((s) => s.round);

export const selectAllRounds = (s: RootState) => roundSelector.selectAll(s);

export const selectRoundById = createSelector(
  [(s: RootState) => s, (_, id: string) => id],
  (s, id) => roundSelector.selectById(s, id),
);
