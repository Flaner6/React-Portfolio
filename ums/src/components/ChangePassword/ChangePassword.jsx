import {  useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import styles from './ChangePassword.module.css'
import { user as _user } from '../../models/auth/selectors';
import {page as _page} from '../../models/auth/selectors'
import { setPage, setUser, setCurrentPage } from '../../models/auth/actions';


const ChangePassword= () => {
    const user = useSelector(_user);
    const page = useSelector(_page);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initState = {
        newPassword: '',
        confirmPassword: ''
    }
    const [editFormData, setEditFormData] =useState(initState)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() =>{

      dispatch(setCurrentPage('/change-password'));

  }, [dispatch]);


    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
      };

    const togglePassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
      };

    const isNotValid = () => {
    if (
        !editFormData.newPassword ||
        editFormData.newPassword !== editFormData.confirmPassword ||
        ((editFormData.newPassword.length < 6 ) ||
        (editFormData.confirmPassword.length < 6 )) ||
        editFormData.newPassword === user.password ||
        editFormData.confirmPassword === user.password

    ) {
        return true;
    }
    return false;
    };

    const submitNewPassword = (e) => {
        e.preventDefault();

        const data = {
            username: user.username,
            password: editFormData.newPassword,
            role: user.role,
            isPasswordSafe: true,
            id: user.id,
            age: Number(user.age),
            fullName: editFormData.fullName,
          };

        fetch(`https://apis.stackprint.io/simple-auth-test/user/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success:', data);
              alert('New Password has been saved');
              navigate(page);
              dispatch(setPage(''));
              dispatch(setUser(data))
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        };




    return (

        <div className={styles.container}>
            <form >
            <label htmlFor='oldPassword'>Old Password: </label>
            <input
                type='text'
                value={user.password || ''}
                name='oldPassword'
                id='oldPassword'
                required
                disabled={true}
            />
            <label htmlFor='newPassword'>New Password: </label>
            <input
                type={isPasswordVisible ? 'text' : 'password'}
                name='newPassword'
                id='newPassword'
                value={editFormData.newPassword}
                onChange={handleEditFormChange}
            />
            <label  htmlFor='confirmPassword'>
                Confirm Password:
            </label>
            <input
                type={isPasswordVisible ? 'text' : 'password'}
                name='confirmPassword'
                id='confirmPassword'
                required
                value={editFormData.confirmPassword}
                onChange={handleEditFormChange}
            />
            <div className={styles.showPassword}>
            <label htmlFor="show_pass"> Show password</label>
            <input
                onClick={togglePassword}
                type='checkbox'
                id='show_pass'
            >
            </input>
            </div>

            <div className={styles.buttonz}>
            <button
            type='submit'
            className={styles.saveButton}
            onClick={submitNewPassword}
            disabled={isNotValid()}
          >
            Submit
          </button>

            </div>
            </form>
        </div>
    );

};




export { ChangePassword };
