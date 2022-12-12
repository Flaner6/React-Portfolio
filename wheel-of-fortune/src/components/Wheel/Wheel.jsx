import styles from './Wheel.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {  roundIsInProgress as _roundIsInProgress, winnerNumber as _winnerNumber  } from '../../models/betting/selectors';

const boardNumbers = [
  {
    value: 'first12',
    name: 'first 12',
    color: 'cyan',
  },
  {
    value: 'second12',
    name: 'second 12',
    color: 'yellow',
  },
  {
    value: 'third12',
    name: 'third 12',
    color: 'purple',
  },
  {
    value: 'first18',
    name: 'first 18',
    color: 'pink',
  },
  {
    value: 'second18',
    name: 'second 18',
    color: 'orange',
  },
  {
    value: 'even',
    name: 'even',
    color: 'grey',
  },
  {
    value: 'odd',
    name: 'odd',
    color: 'blue',
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
    color: 'magenta',
  },
  {
    value: 'twotooneb',
    name: '2 to 1',
    color: 'coral',
  },
  {
    value: 'twotoonec',
    name: '2 to 1',
    color: 'blueviolet',
  },
  {
    value: 0,
    name: 0,
    color: 'green',
  },
  {
    value: 32,
    name: 1,
    color: 'red',
  },
  {
    value: 15,
    name: 2,
    color: 'black',
  },
  {
    value: 19,
    name: 3,
    color: 'red',
  },
  {
    value: 4,
    name: 4,
    color: 'black',
  },
  {
    value: 21,
    name: 5,
    color: 'red',
  },
  {
    value: 2,
    name: 6,
    color: 'black',
  },
  {
    value: 25,
    name: 7,
    color: 'red',
  },
  {
    value: 17,
    name: 8,
    color: 'black',
  },
  {
    value: 34,
    name: 9,
    color: 'red',
  },
  {
    value: 6,
    name: 10,
    color: 'black',
  },
  {
    value: 27,
    name: 11,
    color: 'red',
  },
  {
    value: 13,
    name: 12,
    color: 'black',
  },
  {
    value: 36,
    name: 13,
    color: 'red',
  },
  {
    value: 11,
    name: 14,
    color: 'black',
  },
  {
    value: 30,
    name: 15,
    color: 'red',
  },
  {
    value: 8,
    name: 16,
    color: 'black',
  },
  {
    value: 23,
    name: 17,
    color: 'red',
  },
  {
    value: 10,
    name: 18,
    color: 'black',
  },
  {
    value: 5,
    name: 19,
    color: 'red',
  },
  {
    value: 24,
    name: 20,
    color: 'black',
  },
  {
    value: 16,
    name: 21,
    color: 'red',
  },
  {
    value: 33,
    name: 22,
    color: 'black',
  },
  {
    value: 1,
    name: 23,
    color: 'red',
  },
  {
    value: 20,
    name: 24,
    color: 'black',
  },
  {
    value: 14,
    name: 25,
    color: 'red',
  },
  {
    value: 31,
    name: 26,
    color: 'black',
  },
  {
    value: 9,
    name: 27,
    color: 'red',
  },
  {
    value: 22,
    name: 28,
    color: 'black',
  },
  {
    value: 18,
    name: 29,
    color: 'red',
  },
  {
    value: 29,
    name: 30,
    color: 'black',
  },
  {
    value: 7,
    name: 31,
    color: 'red',
  },
  {
    value: 28,
    name: 33,
    color: 'black',
  },
  {
    value: 12,
    name: 34,
    color: 'red',
  },
  {
    value: 35,
    name: 35,
    color: 'black',
  },
  {
    value: 3,
    name: 35,
    color: 'red',
  },
  {
    value: 26,
    name: 36,
    color: 'black',
  },
  
];

const Wheel = () => {

  const roundIsInProgress = useSelector(_roundIsInProgress);
  const winnerNumber = useSelector(_winnerNumber);

  useEffect(()=>{

  }, [winnerNumber]);

  return (
    <>
      <div className={`${styles.wheel} ${roundIsInProgress ? styles.rotate : ''}`}>
        <ul className={styles.circle}>
          {
            winnerNumber ? null : (
              <div className={` ${roundIsInProgress ? styles.movingBall  : ''} `}/>  
            )
          }
          {boardNumbers
            .filter(({ value }) => typeof value === 'number')
            .slice(0, 37)
            .map(({ value, color }, index) => {
              return (
                <li key={value} className={color} style={{ transform: `rotate(${index * 360 / 37}deg) skewY(-80deg)` }}>
                  <div className={styles.text}>
                    {value}
                    {
                      winnerNumber === value ? (
                        <div className={`${styles.ball}`} style={{marginBottom: '-1em'}}/> 
                      ) : null
                    } 
                  </div>
                </li>
              );
            })}
        </ul>
        <div className={styles.innercircle}></div>
      </div>
    </>
  );
};

export { Wheel };
