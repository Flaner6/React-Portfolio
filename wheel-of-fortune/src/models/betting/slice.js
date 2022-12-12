import { createSlice } from '@reduxjs/toolkit';
import { roundStates } from '../../config/roundStates';

const initialState = {
  funds: 200,
  bets:{

  },
  betAmount: 1,
  roundState: roundStates.waitingForBets,
  winnerNumber: null
};

export const bettingSlice = createSlice({
  name: 'betting',
  initialState,
  reducers: {
    setFunds: (sliceState, action) => {
      sliceState.funds = action.payload;
    },
    setBet: (sliceState, action) => {
      sliceState.bets[`${action.payload.value}`] = action.payload.amount;
    },
    setAllBets: (sliceState, action) => {
      sliceState.bets = action.payload;
    },
    changeBetAmount: (sliceState, action) => {
      sliceState.betAmount = action.payload;
    },
    setRoundState: (sliceState, action) => {
      sliceState.roundState = action.payload;
    },
    setWinnerNumber: (sliceState, action) => {
      sliceState.winnerNumber = action.payload;
    },
    setEarnings: (sliceState, action) => {
      sliceState.earnings = action.payload;
    }
  },
});

