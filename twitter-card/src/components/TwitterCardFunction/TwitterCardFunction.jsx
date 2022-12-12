import { useEffect } from 'react';
import { withName } from '../../hocs/withName';
import { withTimer } from '../../hocs/withTimer';
import { compose } from '../../utils/compose';
import styles from './TwitterCardFunction.module.css';



const _TwitterCardFunction = props => {
  useEffect(() => {
    if (props.seconds % 60 === 0) {
      console.log('1 minute passed')
    }

    return () => {
      console.log('I unmounted')
    };
  }, [props.seconds]);


  return (
    <div className={styles.twitterCardContainer}>
      <div className={styles.Upper}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Raccoon_%28Procyon_lotor%29_2.jpg/1214px-Raccoon_%28Procyon_lotor%29_2.jpg" alt="logo" width="40" height="40"/>
          </div>
          <div className={styles.title}>
            <div className={styles.title}>
              <div>
              <h3>{props.name + ' ' + props.seconds} </h3>
              <div className={styles.secondLogo}>
              <img src= "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/512px-Twitter_Verified_Badge.svg.png?20211123214859" alt="logo" width="20" height="20" />
              </div>
              </div>
              <div className={styles.thirdLogo}>
              </div>

            </div>
            <p>@{props.name}</p>
          </div>
        </div>
        <div className={styles.textArea}>
          <p>{props.description}</p>
        </div>
        <div className={styles.midSection}>
            <div onClick={()=> window.open(props.subContent.url, "_blank")} className={styles.midContent}>
              <div className={styles.pictureContainer}>
                <img src="https://cdn.mos.cms.futurecdn.net/YYH9o4wmSXJfvbzRTq5BTY.jpg" alt="asvos" />
              </div>
              <div className={styles.subtitle}>
                  <h4>{props.subContent.label}</h4>
                  <p>{props.subContent.label}</p>
                  <p className={styles.p2}>{props.subContent.url}</p>
              </div>
            </div>
      </div>

      </div>
      <div className={styles.endSection}>
        <div className={styles.heartsContent}>
          <p>❤️ {props.numHearts} {props.hour} - {props.date}</p>
        </div>
        <div className={styles.commentsContent}>
          <div>
           <a href='https://en.wikipedia.org/wiki/Procyonidae'>💬 {props.numComments} people are talkin about this </a>
          </div>
        </div>


      </div>
    </div>
  );
}

export const TwitterCardFunction = compose(
  withTimer,
  withName
)(_TwitterCardFunction);
