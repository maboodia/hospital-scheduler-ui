import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders the application', () => {
  render(<App />);

  const schedulesFormHeader = screen.getByText(/Add New Schedule/i);
  expect(schedulesFormHeader).toBeInTheDocument();

  const schedulesListHeader = screen.getByText(/Add New Schedule/i);
  expect(schedulesListHeader).toBeInTheDocument();

  const refreshButton = screen.getByText(/Refresh/i);
  expect(refreshButton).toBeInTheDocument();

});
