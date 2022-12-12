import { render, screen } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import { Home } from './Home';
import * as useSelector from '../../utils/useSelector/useSelector';
import * as useNavigate from '../../utils/useNavigate/useNavigate';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
}));

describe('home component', () => {
  const initialFetch = window.fetch;
  let useSelectorSpy;
  let useNavigateSpy;

  beforeEach(() => {
    useSelectorSpy = jest.spyOn(useSelector, 'useSelector');
    useNavigateSpy = jest.spyOn(useNavigate, 'useNavigate');
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', username: 'giannis' }],
    });

    useSelectorSpy.mockImplementation(() => {
      return {
        id: 123,
        username: 'my username',
        password: 'my password',
        fullName: 'my fullname',
        age: 20,
        role: 'admin',
      };
    });

    useNavigateSpy.mockImplementation(() => {
      return () => {};
    });

    ReactRedux.useDispatch = jest.fn().mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.fetch = initialFetch;
  });

  test('check for form', async () => {
    render(<Home />);

    const formItem = screen.getByRole('form');
    expect(formItem).toBeInTheDocument();
  });
});
