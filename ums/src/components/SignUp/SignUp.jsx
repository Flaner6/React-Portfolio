import { useState } from 'react';
import styles from './SignUp.module.css';
import { useDispatch } from 'react-redux'
import { useNavigate} from 'react-router-dom';
import { setUser } from '../../models/auth/actions';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNotValid = () => {
    if (
      !username ||
      !password ||
      username === 'admin' ||
      password !== confirmPassword ||
      password.length < 6 ||
      confirmPassword.length < 6
    ) {
      return true;
    }
    return false;
  };

  const postUser = () => {
    const data = { username, password, role: 'user', isPasswordSafe: true };

    fetch(`https://apis.stackprint.io/simple-auth-test/user`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response)=>{
        console.log(response)
        dispatch(setUser(response))
        navigate('/home');
      })
      // .then((data) => {
      //   console.log('Success:', data);
      // })

      .catch((error) => {
        console.error('Error:', error);
      });

  };

  const doesUsernameExist = async (username) => {
    try {
      const urlParams = new URLSearchParams({
        username,
      }).toString();

      const response = await fetch(
        `https://apis.stackprint.io/simple-auth-test/user?${urlParams}`
      );

      const existingUsers = await response.json();

      return existingUsers.length > 0;
    } catch (error) {
      return true;
    }
  };

  const setRememberMeInLocalStorage = () => {
    if (rememberMe) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const userExists = await doesUsernameExist(username);

    if (userExists) {
      alert('User already exists');
    } else {
      postUser();
      setRememberMeInLocalStorage();
    }
  };

  return (
    <form onSubmit={submitForm} className={styles.container}>
      <label htmlFor='signup_username'>Username: </label>
      <input
        id='signup_username'
        type='text'
        placeholder='Enter Username'
        name='username'
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor='signup_password'>Password: </label>
      <input
        id='signup_password'
        type='password'
        placeholder='Enter Password'
        name='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor='signup_confirm_password'>Confirm Password: </label>
      <input
        id='signup_confirm_password'
        type='password'
        placeholder='Confirm Password'
        name='confirm_password'
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className={styles.keepLogIn}>
        <input
          type='checkbox'
          id='signup_remember_me'
          checked={rememberMe}
          onChange={() => {
            setRememberMe((rememberMe) => {
              return !rememberMe;
            });
          }}
        />
        <label htmlFor='signup_remember_me'>Keep me logged in</label>
      </div>
      <button type='submit' disabled={isNotValid()}>
        Sign Up
      </button>
    </form>
  );
};

export { SignUp };
