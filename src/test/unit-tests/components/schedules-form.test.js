import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SchedulesForm from '../../../components/schedules-form';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const patientsData = require('../../test-data/patients-data');
const emptyPatientsData = require('../../test-data/empty-patients-data');

test('renders a list of patients', () => {
  render(<SchedulesForm patientsData={patientsData} refreshFunction={jest.fn()} />);

  const patientLabel = screen.getByText(/Patient/i);
  expect(patientLabel).toBeInTheDocument();

  const selectOptions = screen.getAllByRole('option');
  expect(selectOptions).toHaveLength(11);

  const dateLabel = screen.getByText(/Date/i);
  expect(dateLabel).toBeInTheDocument();

  const submitButton = screen.getByText(/Submit/i);
  expect(submitButton).toBeInTheDocument();

});

test('renders empty list of patients', () => {
  render(<SchedulesForm patientsData={emptyPatientsData} refreshFunction={jest.fn()} />);

  const patientLabel = screen.getByText(/Patient/i);
  expect(patientLabel).toBeInTheDocument();

  const selectOptions = screen.getAllByRole('option');
  expect(selectOptions).toHaveLength(1);

  const dateLabel = screen.getByText(/Date/i);
  expect(dateLabel).toBeInTheDocument();

  const submitButton = screen.getByText(/Submit/i);
  expect(submitButton).toBeInTheDocument();

});

test('click the submit button - empty input', () => {
  render(<SchedulesForm patientsData={patientsData} refreshFunction={jest.fn()} />);

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  const errorMsg = screen.getByText(/Please Choose a Patient/i);
  expect(errorMsg).toBeInTheDocument();

});
