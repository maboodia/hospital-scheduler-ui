import { render, screen } from '@testing-library/react';
import SchedulesForm from '../../../components/schedules-form';


const patientsData = require('../../test-data/patients-data');
const emptyPatientsData = require('../../test-data/empty-patients-data');

test('renders a list of patients', () => {
  render(<SchedulesForm patientsData={patientsData}/>);

  const patientLabel = screen.getByText(/Patient/i);
  expect(patientLabel).toBeInTheDocument();

  const selectOptions = screen.getAllByRole('option');
  expect(selectOptions).toHaveLength(11);

  const dateLabel = screen.getByText(/Date/i);
  expect(dateLabel).toBeInTheDocument();

  const refreshButton = screen.getByText(/Submit/i);
  expect(refreshButton).toBeInTheDocument();

});

test('renders empty list of patients', () => {
  render(<SchedulesForm patientsData={emptyPatientsData}/>);

  const patientLabel = screen.getByText(/Patient/i);
  expect(patientLabel).toBeInTheDocument();

  const selectOptions = screen.getAllByRole('option');
  expect(selectOptions).toHaveLength(1);

  const dateLabel = screen.getByText(/Date/i);
  expect(dateLabel).toBeInTheDocument();

  const refreshButton = screen.getByText(/Submit/i);
  expect(refreshButton).toBeInTheDocument();

});
