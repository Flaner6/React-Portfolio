import { useSelector, useDispatch } from 'react-redux'
import { TwitterCardClass } from './../TwitterCardClass/TwitterCardClass';
import { TwitterCardFunction } from './../TwitterCardFunction/TwitterCardFunction';
import {
  nextId,
  toggleFunctionComponent,
  toggleClassComponent
} from '../../models/twitter/actions';
import {
  ids as _ids,
  isFunctionComponentVisible as _isFunctionComponentVisible,
  isClassComponentVisible as _isClassComponentVisible
} from '../../models/twitter/selectors';
import styles from './Root.module.css';

export function Root() {
  const { id1 = 1, id2 = 2 } = useSelector(_ids);
  const isFunctionComponentVisible = useSelector(_isFunctionComponentVisible);
  const isClassComponentVisible = useSelector(_isClassComponentVisible);
  const dispatch = useDispatch();

  const subtitle = {
    label: 'Glorious raccoon facts',
    url: 'https://en.wikipedia.org/wiki/Raccoon',
  };

  return (
    <div className={styles.container}>
      <div className={styles.singleCardContainer}>
        <button
          className={styles.classComponentButton}
          onClick={() => dispatch(toggleClassComponent())}
        >
          Toggle Class Component Card
        </button>

        {isClassComponentVisible ? (
          <div className={styles.cardContainer} onClick={() => dispatch(nextId('id1'))}>
            <TwitterCardClass
              id={id1}
              description='As a result of escapes and deliberate introductions in the mid-20th century, raccoons are now also distributed across much of mainland Europe, the Caucasus, and Japan.'
              subContent={subtitle}
              numHearts={712}
              hour='6:23 PM'
              date='July 9, 2022'
              numComments={391}
            />
          </div>
        ) : null}
      </div>

      <div className={styles.singleCardContainer}>
        <button
          className={styles.funcComponentButton}
          onClick={() => dispatch(toggleFunctionComponent())}
        >
          Function Component Card
        </button>

        {isFunctionComponentVisible && (
          <div className={styles.cardContainer} onClick={() => dispatch(nextId('id2'))}>
            <TwitterCardFunction
              id={id2}
              description='As a result of escapes and deliberate introductions in the mid-20th century, raccoons are now also distributed across much of mainland Europe, the Caucasus, and Japan.'
              subContent={subtitle}
              numHearts={712}
              hour='6:23 PM'
              date='July 9, 2022'
              numComments={391}
            />
          </div>
        )}
      </div>
    </div>
  );
}
