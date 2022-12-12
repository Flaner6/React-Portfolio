import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { navigate } from '../../models/auth/actions';
import { user as _user } from '../../models/auth/selectors';
import { useSelector } from '../../utils/useSelector/useSelector';
import styles from './Home.module.css';

export const Home = () => {
  const user = useSelector(_user);
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    isPasswordVisible: false,
    password: user.password || '',
    confirmPassword: user.password || '',
    age: `${user.age}`,
    fullName: user.fullName,
    noneditableForm: true
  });

  useEffect(() => {
    setFormState(prevState => ({
      ...prevState,
      password: user.password || '',
      confirmPassword: user.password || '',
      age: `${user.age}`,
      fullName: user.fullName,
    }))
  }, [user])

  const initialState = {
    isPasswordVisible: false,
    password: user.password || '',
    confirmPassword: user.password || '',
    age: `${user.age}`,
    fullName: user.fullName,
    noneditableForm: true
  };

  const editForm = () => {
    setFormState((current) => ({
      ...current,
      noneditableForm: !current.noneditableForm,
    }));
  };

  const resetForm = () => {
    setFormState(initialState);
  }

  const editUser = (e) => {
    e.preventDefault();
    const data = {
      username: user.username,
      password: formState.password,
      role: user.role,
      isPasswordSafe: user.isPasswordSafe,
      id: user.id,
      age: Number(formState.age),
      fullName: formState.fullName,
    };
    console.log(user.id);

    fetch(`https://apis.stackprint.io/simple-auth-test/user/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setFormElement('noneditableForm')(true);
        alert('All changes have been saved!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const isAdmin = () => {
    if (
      user.username === 'admin'

    ) {
      return true;
    }
    return false;

  };

  const isNotValid = () => {
    if (
      !formState.password ||
      formState.password !== formState.confirmPassword ||
      (formState.password.length < 6 && user.username !== 'admin') ||
      (formState.confirmPassword.length < 6 && user.username !== 'admin')
    ) {
      return true;
    }
    return false;
  };

  const togglePassword = () => {
    setFormElement('isPasswordVisible')(!formState.isPasswordVisible);
  };

  const setFormElement = (elementKey) => (newValue) => {
    setFormState((current) => ({
      ...current,
      [elementKey]: newValue,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.userCard}>
        <form onSubmit={editUser} aria-label="edit-user-form">
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            value={user.username || ''}
            name='username'
            id='username'
            required
            disabled={true}
          />
          <label htmlFor='password'>Change Password: </label>
          <input
            type={formState.isPasswordVisible ? 'text' : 'password'}
            value={formState.password || ''}
            name='password'
            id='password'
            required
            disabled={formState.noneditableForm}
            onChange={(e) => setFormElement('password')(e.target.value)}
          />
          <label hidden={formState.noneditableForm} htmlFor='confirm_password'>
            Confirm Password:{' '}
          </label>
          <input
            type={formState.isPasswordVisible ? 'text' : 'password'}
            value={formState.confirmPassword || ''}
            name='confirm_password'
            id='confirm_password'
            required
            hidden={formState.noneditableForm}
            onChange={(e) => setFormElement('confirmPassword')(e.target.value)}
          />
          <div className={styles.showPassword}>
            <label htmlFor="show_pass"> Show password</label>
            <input
              onClick={togglePassword}
              type='checkbox'
              hidden={formState.noneditableForm}
              id='show_pass'
            >
          </input>

          </div>
          <label htmlFor='fullname'>Full Name: </label>
          <input
            type='text'
            value={formState.fullName || ''}
            name='fullname'
            id='fullname'
            disabled={formState.noneditableForm}
            onChange={(e) => setFormElement('fullName')(e.target.value)}
          />
          <label htmlFor='age'>Age: </label>
          <input
            type='number'
            value={formState.age || ''}
            min={0}
            max={200}
            name='age'
            className={styles.age}
            id='age'
            disabled={formState.noneditableForm}
            onChange={(e) => setFormElement('age')(e.target.value)}
          />
          <label htmlFor='role'>Role: </label>
          <input
            type='text'
            value={user.role || ''}
            name='role'
            id='role'
            disabled={true}
          />
          <div className={styles.buttonz}>
            <button
                type='button'
                hidden={!isAdmin()}
                onClick={() => { dispatch(navigate('/all-users'))}}
              >
                Go to all users
            </button>
            <button
              className={
                formState.noneditableForm
                  ? styles.editButtonText
                  : styles.cancelButtonText
              }
              type='button'
              onClick={() => {formState.noneditableForm ? editForm() : resetForm() }}
            >
              {formState.noneditableForm ? 'Edit' : 'Cancel'}
            </button>
            {!formState.noneditableForm ? (
              <button
                type='submit'
                hidden={formState.noneditableForm}
                disabled={isNotValid()}
              >
                Save
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};
