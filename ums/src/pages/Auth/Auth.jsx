import { SignIn } from '../../components/SignIn/SignIn';
import { SignUp } from '../../components/SignUp/SignUp';
import styles from './Auth.module.css';

export const Auth = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <SignIn />
        </div>
        <div className={styles.card}>
          <SignUp />
        </div>
      </div>
    </div>
  );
};
