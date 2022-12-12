import { useDispatch, useSelector } from 'react-redux';
import { placeBet } from '../../models/betting/actions';
import styles from './Board.module.css';
import {bets as _bets, betAmount as _betAmount, funds as _funds, roundIsInStandby as _roundIsInStandby} from '../../models/betting/selectors'
import { changeBetAmount } from '../../models/betting/actions';

const boardNumbers = [
  {
    value: 'first12',
    name: 'first 12',
    color: 'green',
  },
  {
    value: 'second12',
    name: 'second 12',
    color: 'green',
  },
  {
    value: 'third12',
    name: 'third 12',
    color: 'green',
  },
  {
    value: 'first18',
    name: 'first 18',
    color: 'green',
  },
  {
    value: 'second18',
    name: 'second 18',
    color: 'green',
  },
  {
    value: 'even',
    name: 'even',
    color: 'green',
  },
  {
    value: 'odd',
    name: 'odd',
    color: 'green',
  },
  {
    value: 'red',
    name: 'red',
    color: 'red',
  },
  {
    value: 'black',
    name: 'black',
    color: 'black',
  },
  {
    value: 'twotoonea',
    name: '2 to 1',
    color: 'green',
  },
  {
    value: 'twotooneb',
    name: '2 to 1',
    color: 'green',
  },
  {
    value: 'twotoonec',
    name: '2 to 1',
    color: 'green',
  },
  {
    value: 0,
    name: 0,
    color: 'green',
  },
  {
    value: 1,
    name: 1,
    color: 'red',
  },
  {
    value: 2,
    name:2,
    color: 'black',
  },
  {
    value: 3,
    name: 3,
    color: 'red',
  },
  {
    value: 4,
    name: 4,
    color: 'black',
  },
  {
    value: 5,
    name: 5,
    color: 'red',
  },
  {
    value: 6,
    name:6,
    color: 'black',
  },
  {
    value: 7,
    name: 7,
    color: 'red',
  },
  {
    value: 8,
    name: 8,
    color: 'black',
  },
  {
    value: 9,
    name: 9,
    color: 'red',
  },
  {
    value: 10,
    name: 10,
    color: 'black',
  },
  {
    value: 11,
    name: 11,
    color: 'black',
  },
  {
    value: 12,
    name: 12,
    color: 'red',
  },
  {
    value: 13,
    name: 13,
    color: 'black',
  },
  {
    value: 14,
    name: 14,
    color: 'red',
  },
  {
    value: 15,
    name: 15,
    color: 'black',
  },
  {
    value: 16,
    name: 16,
    color: 'red',
  },
  {
    value: 17,
    name: 17,
    color: 'black',
  },
  {
    value: 18,
    name: 18,
    color: 'red',
  },
  {
    value: 19,
    name: 19,
    color: 'red',
  },
  {
    value: 20,
    name: 20,
    color: 'black',
  },
  {
    value: 21,
    name: 21,
    color: 'red',
  },
  {
    value: 22,
    name: 22,
    color: 'black',
  },
  {
    value: 23,
    name: 23,
    color: 'red',
  },
  {
    value: 24,
    name: 24,
    color: 'black',
  },
  {
    value: 25,
    name: 25,
    color: 'red',
  },
  {
    value: 26,
    name: 26,
    color: 'black',
  },
  {
    value: 27,
    name: 27,
    color: 'red',
  },
  {
    value: 28,
    name: 28,
    color: 'black',
  },
  {
    value: 29,
    name: 29,
    color: 'black',
  },
  {
    value: 30,
    name: 30,
    color: 'red',
  },
  {
    value: 31,
    name: 31,
    color: 'black',
  },
  {
    value: 32,
    name: 32,
    color: 'red',
  },
  {
    value: 33,
    name: 33,
    color: 'black',
  },
  {
    value: 34,
    name: 34,
    color: 'red',
  },
  {
    value: 35,
    name: 35,
    color: 'black',
  },
  {
    value: 36,
    name: 36,
    color: 'red',
  },
];

const Board = () => {
  const dispatch = useDispatch();
  const bets = useSelector(_bets);
  const funds = useSelector(_funds)
  const betAmount = useSelector(_betAmount);
  const roundIsInStandby = useSelector(_roundIsInStandby);

  if(betAmount > funds) {
    dispatch(changeBetAmount(funds))
  }

  return (
    <>
    <div className={styles.wrapper}>
      <div className={styles.numbersContainer}>
          {boardNumbers.map(({ value, color, name }) => (
            <button
              key={value}
              className={color}
              style={{
                gridArea: `b${value}`,
              }}
              onClick={() => {
                if (betAmount <= funds && roundIsInStandby){
                  dispatch(placeBet({
                    value,
                    amount: Number(betAmount)
                  }))
                } 
                else if (betAmount > funds && roundIsInStandby){
                  dispatch(placeBet({
                    value,
                    amount: Number(funds)
                  }))
                }
              }}
            >
              {name} {
                bets[`${value}`] ? (
                  <div className={`${styles.chip} ${bets[`${value}`] > 50 ? styles.yellowChip : styles.plainChip}`}>{bets[`${value}`]}</div>
                ) : null
              }
            </button>
          ))}
        </div>
    </div>



    </>
  );
};

export { Board };
