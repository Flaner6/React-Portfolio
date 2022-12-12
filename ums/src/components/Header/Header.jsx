import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { navigate } from '../../models/auth/actions';
import styles from './Header.module.css';
import { user as _user } from '../../models/auth/selectors';
import { currentPage as _currentPage } from '../../models/auth/selectors';


const Header = () => {
  const user = useSelector(_user);
  const currentPage = useSelector(_currentPage);
  const dispatch = useDispatch();

  return (
    <div className={styles.header}>
      UMS {user.username ? ` -> Hello there, ${user.username}` : ''}
      <div className={styles.headerRight}>
        <button
          className={currentPage === '/' || !currentPage ? styles.active : styles.inactive}
          onClick={() => dispatch(navigate('/'))}
          disabled={currentPage === '/change-password'}
        >
          Authentication
        </button>
        <button
          className={currentPage === '/home' ? styles.active : styles.inactive}
          onClick={() => dispatch(navigate('/home'))}
          disabled={currentPage === '/change-password' || !user.username}
        >
          Home
        </button>
        <button
          className={currentPage === '/all-users' ? styles.active : styles.inactive}
          hidden={!user || user.role !== 'admin'}
          onClick={() => dispatch(navigate('/all-users'))}
          disabled={currentPage === '/change-password'}
        >
          All Users
        </button>
      </div>
    </div>
  );
};

export { Header };
