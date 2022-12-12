import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserById } from '../../models/users/actions';
import styles from './EditableRow.module.css';

const EditableRow = ({
  user,
  onCompleteEdit,
  handleCancelClick,
}) => {
  const [editFormData, setEditFormData] = useState(user);
  const dispatch = useDispatch();
  console.log('user data:', user);
  console.log('form data:', editFormData);

  const handleEditFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const saveNewUser = (e) => {
    e.preventDefault();

    const dataForSaving = {
      username: editFormData.username,
      password: editFormData.password,
      role: editFormData.role,
      isPasswordSafe: user.password === editFormData.password ? true : false,
      id: editFormData.id,
      age: Number(editFormData.age) || 0,
      fullName: editFormData.fullName,
    };

    fetch(`https://apis.stackprint.io/simple-auth-test/user/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(dataForSaving),
    })
      .then((response) => response.json())
      .then((dataForSaving) => {
        console.log('Success:', dataForSaving);
        dispatch(setUserById(dataForSaving));
        alert('All changes have been saved!');
        onCompleteEdit();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <tr>
      <td>{user.username}</td>
      <td>
        <input
          type='text'
          required='required'
          placeholder='Enter a password...'
          name='password'
          value={editFormData.password}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type='text'
          placeholder='Enter the full name...'
          name='fullName'
          value={editFormData.fullName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td >
        <input
          type='number'
          placeholder='Enter an age...'
          name='age'
          value={editFormData.age}
          onChange={handleEditFormChange}
          className={styles.ageInput}
        ></input>
      </td>
      <td>{user.role}</td>
      <td>
        <div className={styles.editButtonsDiv}>
          <button
            type='submit'
            className={styles.saveButton}
            onClick={saveNewUser}
          >
            Save
          </button>
          <button
            type='button'
            onClick={handleCancelClick}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
};

export { EditableRow };
