import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from '../Pagination/Pagination';
import { baseUrl } from '../../constants';
import styles from './UsersTable.module.css';
import { EditableRow } from '../EditableRow/EditableRow';
import { users as _users } from '../../models/users/selectors';
import { setUsers, deleteUserById } from '../../models/users/actions';
import { useSelector } from '../../utils/useSelector/useSelector';

const useActions = (...actions) => {
  const dispatch = useDispatch();

  return actions.map(action => {
    return (...payload) => dispatch(action(...payload));
  });
}

const UsersTable = () => {
  const users = useSelector(_users);
  const [_setUsers, _deleteUserById ] = useActions(setUsers, deleteUserById);

  const [editUserId, setEditUserId] = useState(null);

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage, setRecordsPerPage] = useState(3);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Records to be displayed on the current page
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / recordsPerPage);

  useEffect(() => {
    fetch(`${baseUrl}/simple-auth-test/user`)
      .then((response) => response.json())
      .then((data) => {
        _setUsers(data)
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);
  };

  const handleDeleteClick = (event, user) => {
    event.preventDefault();
    if (user.username === 'admin') {
      alert("Don't try it!");
    } else {
      if (window.confirm('Are you sure you want to delete this user?')) {
        fetch(`${baseUrl}/simple-auth-test/user/${user.id}`, {
          method: 'DELETE',
        });
        _deleteUserById(user);
      } else {
        console.log('not deleted');
      }
    }
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  return (
    <div>
      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Role</th>
            <th className={styles.editRow}>Edit</th>
            <th className={styles.editRow} hidden={!!editUserId}>
              Delete
            </th>
          </tr>
        </thead>

        <tbody>
          {currentRecords.map((user) =>
            editUserId !== user.id ? (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.fullName}</td>
                <td>{user.age}</td>
                <td>{user.role}</td>
                <td
                  className={!!editUserId ? styles.editRowLong : styles.editRow}
                >
                  <button
                    type='button'
                    className={styles.editButton}
                    onClick={(event) => handleEditClick(event, user)}
                    hidden={!!editUserId}
                    data-testid='edit-user-button'
                  >
                    Edit
                  </button>
                </td>
                <td className={styles.editRow} hidden={!!editUserId}>
                  <button
                    type='button'
                    className={styles.deleteButton}
                    onClick={(event) => handleDeleteClick(event, user)}
                    hidden={!!editUserId}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ) : (
              <EditableRow
                key={user.id}
                user={user}
                handleCancelClick={handleCancelClick}
                onCompleteEdit={() => {
                  setEditUserId(null);
                }}
              />
            )
          )}
        </tbody>
      </table>
      <div className={styles.settingPages}>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setRecordsPerPage={setRecordsPerPage}
        />
      </div>
    </div>
  );
};

export { UsersTable };
