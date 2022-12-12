import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, withLatestFrom, delay } from 'rxjs';
import { roundStates } from '../../config/roundStates';
import { spinResults } from '../../utils/rouletteSpin';
import { placeBet, setFunds, setBet, startRound, setRoundState, resolveRound, setAllBets, changeBetAmount, reset, setWinnerNumber, setEarnings } from './actions';
import { bets, funds, earnings as _earnings } from './selectors';



const placeBetEpic = (action$, state$) => {
    return action$.pipe(
      ofType(placeBet.type),
      withLatestFrom(state$),
      mergeMap(([{ payload }, state]) => {
        const newBet = (bets(state)[`${payload.value}`] || 0) + payload.amount;
        const newFunds = funds(state) - payload.amount;
       return [
        setFunds(newFunds),
        setBet({
            value: payload.value,
            amount: newBet
        })
       ];
      })
    )
  }


  const startRoundEpic = (action$) => {
    return action$.pipe(
      ofType(startRound.type),
      mergeMap(() => {
       return [setRoundState(roundStates.inProgress), setWinnerNumber(null)]
      })
    )
  }

  const finishRoundEpic = (action$, state$) => {
    return action$.pipe(
      ofType(startRound.type),
      delay(6000),
      withLatestFrom(state$),
      mergeMap(([,state]) => {
        const actionsForReturn = [];
        const {earnings, winnerNumber} = spinResults(bets(state));
        actionsForReturn.push(setEarnings(earnings));
        actionsForReturn.push(setWinnerNumber(winnerNumber));
        actionsForReturn.push(setRoundState(roundStates.finished));

        return actionsForReturn;
      })
    )
  }

  const resetEpic = (action$, $state) => {
    return action$.pipe(
      ofType(reset.type),
      withLatestFrom($state),
      mergeMap(([,state]) => {
       return [
        setFunds(funds(state)),
        setAllBets({}),
        changeBetAmount(1)
       ];
      })
    )
  }

  const resolveRoundEpic = (action$, state$) => {
    return action$.pipe(
      ofType(resolveRound.type),
      withLatestFrom(state$),
      mergeMap(([,state]) => {
        const actionsForReturn = [];

        const earnings = _earnings(state)
        if (earnings){
            alert(`you won ${earnings} dollars`)
        }
        if(earnings){
            actionsForReturn.push(setFunds(funds(state) + earnings));
        };
        actionsForReturn.push(setAllBets({}));
        actionsForReturn.push(setRoundState(roundStates.waitingForBets));

        return actionsForReturn;
      })
    )
  }



const bettingRootEpic = combineEpics(placeBetEpic, startRoundEpic, finishRoundEpic, resolveRoundEpic, resetEpic);

export { bettingRootEpic };

