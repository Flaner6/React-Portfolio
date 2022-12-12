import { render, screen } from '@testing-library/react';
import * as Root from './components/Root/Root';
import App from './App';

test('renders learn react link',  () => {
  const rootSpy = jest.spyOn(Root, 'Root');
  rootSpy.mockImplementation(() => <div data-testid="my-test-mock-root">Root</div>);

  render(<App />);
  const rootElement = screen.getByTestId('my-test-mock-root');
  expect(rootElement).toBeInTheDocument();

  const userName = screen.getByText('Root');
  expect(userName).toBeInTheDocument();


  expect(rootElement.innerHTML).toBe('Root');


});

