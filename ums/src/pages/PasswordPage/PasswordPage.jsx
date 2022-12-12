import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { user as _user } from '../../models/auth/selectors';
import { ChangePassword } from '../../components/ChangePassword/ChangePassword';

export const PasswordPage = () => {
  const user = useSelector(_user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.username) {
      alert('There is no reason for you to be here.');
      navigate('/');
    }
  }, [navigate, user.username]);

  return (
    <div>
      <ChangePassword />
    </div>
  );
};
