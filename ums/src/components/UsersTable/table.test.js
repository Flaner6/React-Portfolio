import { render, screen, act } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import * as EditableRow from '../EditableRow/EditableRow';
import * as useSelector from '../../utils/useSelector/useSelector';
import { UsersTable } from './UsersTable';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
}));

describe('table component', () => {
  const initialFetch = window.fetch;
  let editableRowSpy;
  let useSelectorSpy;

  beforeEach(() => {
    editableRowSpy = jest.spyOn(EditableRow, 'EditableRow');
    useSelectorSpy = jest.spyOn(useSelector, 'useSelector');
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', username: 'giannis' }],
    });

    useSelectorSpy.mockImplementation(() => {
      return [
        {
          id: 123,
          username: 'my username',
          password: 'my password',
          fullName: 'my fullname',
          age: 20,
          role: 'admin',
        },
      ];
    });

    ReactRedux.useDispatch = jest.fn().mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.fetch = initialFetch;
  });

  test('check for table', () => {
    render(<UsersTable />);

    const tableItem = screen.getByRole('table');
    expect(tableItem).toBeInTheDocument();
  });

  test('check that edit button works', () => {
    editableRowSpy.mockImplementation((props) => {
      return (
        <tr key={props.user.id}>
          <td>editable row {props.user.id}</td>
        </tr>
      );
    });

    render(<UsersTable />);

    const editButtons = screen.getByTestId('edit-user-button');
    expect(editButtons).toBeInTheDocument();

    act(() => {
      editButtons.click();
    });

    const editableRows = screen.getByText('editable row 123');
    expect(editableRows).toBeInTheDocument();
  });
});
