import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';
import { Auth } from '../../pages/Auth/Auth';
import { AllUsers } from '../../pages/AllUsers/AllUsers';
import { PasswordPage } from '../../pages/PasswordPage/PasswordPage';
import { currentPage } from '../../models/auth/selectors';
import { useSelector } from '../../utils/useSelector/useSelector';
import { useNavigate } from '../../utils/useNavigate/useNavigate';
import { Header } from '../Header/Header';
import styles from './Root.module.css';

export function Root() {
  const _currentPage = useSelector(currentPage);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(_currentPage);
  }, [_currentPage, navigate])

  return (
    <>
      <Header />
      <div className={styles.routeContent}>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='home' element={<Home />} />
          <Route path='*' element={<Auth />} />
          <Route path='all-users' element={<AllUsers />} />
          <Route path='change-password' element={<PasswordPage />} />
        </Routes>
      </div>
    </>
  );
}
