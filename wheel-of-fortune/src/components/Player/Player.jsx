import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import styles from './Player.module.css';
import { bets as _bets, betAmount as _betAmount, funds as _funds, roundIsInStandby as _roundIsInStandby, hasBets as _hasBets, roundIsFinished as _roundIsFinished} from '../../models/betting/selectors';
import { reset, changeBetAmount, startRound, resolveRound } from '../../models/betting/actions';



const Player = () => {
    const dispatch = useDispatch();
    const funds = useSelector(_funds)
    const betAmount = useSelector(_betAmount)
    const bets = useSelector(_bets)
    const inputRef = useRef(null);
    const roundIsInStandby = useSelector(_roundIsInStandby);
    const roundIsFinished= useSelector(_roundIsFinished);
    const hasBets = useSelector(_hasBets);


    const handleClick = () => {
        if (inputRef.current.value <= funds) {
            dispatch(changeBetAmount(inputRef.current.value));
        } else {
            dispatch(changeBetAmount(funds))
        }
    }


    return (
        <div className={styles.playerCard}>
            <div className={styles.wrapper}>
                <h1>Player 1 available funds: {funds}$</h1>
                <h2>Betting: {betAmount}$</h2>
            </div>
            <div>

                <form>
                    <label htmlFor='changeAmount'>Select bet amount: </label>
                    <input
                        ref={inputRef}
                        type='number'
                        max={funds}
                        min={1}
                        defaultValue={betAmount}
                        name='changeAmount'
                        id='changeAmount'
                    // value={betAmount}
                    // onInput={(e) => setGoToPageValue(e.target.value)}
                    // onChange={(e) => changePageValue(e)}
                    />
                    <button type="button" onClick={handleClick}>
                        Select
                    </button>
                </form>

            </div>
            <div className={styles.buttonWrapper}>
                <button
                    className={styles.playerButton}
                    onClick={() =>{ 
                        dispatch(startRound())
                        console.log(bets)
                    }}
                    disabled={!roundIsInStandby || !hasBets}
                >
                    Start
                </button>
                <button
                    className={styles.playerButton}
                    onClick={() => dispatch(reset())}
                    disabled={!roundIsInStandby || !hasBets}
                    >
                    Reset
                </button>  
                <button
                    className={styles.playerButton}
                    onClick={() => {
                        dispatch(resolveRound())
                    }}
                    disabled={!roundIsFinished}
                >
                    Resolve Round
                </button>
            </div>

        </div>


    )
}

export { Player };