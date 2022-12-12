import { bettingSlice } from './slice';
import { createAction } from '../../utils/createAction';
// import { createAction } from '@reduxjs/toolkit';

export const {
  setFunds,
  setBet,
  setAllBets,
  changeBetAmount,
  setRoundState,
  setWinnerNumber,
  setEarnings
 } = bettingSlice.actions;



export const placeBet = createAction( `${bettingSlice.name}/placeBet`)
export const startRound = createAction( `${bettingSlice.name}/startRound`)
export const resolveRound = createAction( `${bettingSlice.name}/resolveRound`)
export const reset = createAction( `${bettingSlice.name}/reset`)

