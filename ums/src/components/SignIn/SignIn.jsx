import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../utils/useSelector/useSelector';
import { signInError } from '../../models/auth/selectors';
import { login } from '../../models/auth/actions';
import styles from './SignIn.module.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const _signInError = useSelector(signInError);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login({
      username,
      password,
      rememberCredentials: rememberMe
    }))
  };

  return (
    <form onSubmit={submitForm} className={styles.container}>
      {
        _signInError ? (
          <div>{_signInError}</div>
        ) : null
      }
      <label htmlFor='signin_username'>Username: </label>
      <input
        type='text'
        placeholder='Enter Username'
        name='username'
        id='signin_username'
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor='signin_password'>Password: </label>
      <input
        type='password'
        placeholder='Enter Password'
        name='password'
        id='signin_password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={styles.keepLogIn}>
        <input
          type='checkbox'
          id='signin_remember_me'
          checked={rememberMe}
          onChange={(e) => {
            setRememberMe((rememberMe) => {
              return !rememberMe;
            });
          }}
        />
        <label htmlFor='signin_remember_me'>Keep me logged in</label>
      </div>
      <button type='submit' disabled={!username || !password}>
        Login
      </button>
    </form>
  );
};

export { SignIn };
