import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PatientSchedules from '../../../components/patient-schedules';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const patientsData = require('../../test-data/patients-data');
const doctorsData = require('../../test-data/doctors-data');

test('renders a list of patients', () => {
  render(<PatientSchedules patientsData={patientsData} doctorsData={doctorsData} />);

  const patientName = screen.getByText(/Muhamad Aboodia/i);
  expect(patientName).toBeInTheDocument();

});

test('delete a schedule - success', async () => {

  let mock = new MockAdapter(axios);
  mock.onDelete().reply(200);

  render(<PatientSchedules patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  const deleteButtons = screen.getAllByText(/Delete/i);
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {});

});

test('delete a schedule - error', async () => {

  let mock = new MockAdapter(axios);
  mock.onDelete().reply(500);

  render(<PatientSchedules patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  const deleteButtons = screen.getAllByText(/Delete/i);
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {});

});
