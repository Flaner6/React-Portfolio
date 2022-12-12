import { roundStates } from '../../config/roundStates';
import { bettingSlice } from './slice';

const sliceName = bettingSlice.name;

export const funds = (state) => state[sliceName].funds;
export const bets = (state) => state[sliceName].bets;
export const hasBets = (state) => !!Object.keys(state[sliceName].bets).length; // check if at least one bet has been placed on board
export const betAmount = (state) => state[sliceName].betAmount;
export const winnerNumber = (state) => state[sliceName].winnerNumber;
export const earnings = (state) => state[sliceName].earnings;

export const roundIsInStandby = (state) => state[sliceName].roundState === roundStates.waitingForBets;
export const roundIsInProgress = (state) => state[sliceName].roundState === roundStates.inProgress;
export const roundIsFinished = (state) => state[sliceName].roundState === roundStates.finished;

