import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DoctorSchedules from '../../../components/doctor-schedules';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const patientsData = require('../../test-data/patients-data');
const doctorsData = require('../../test-data/doctors-data');

test('renders a list of doctors', () => {
  render(<DoctorSchedules patientsData={patientsData} doctorsData={doctorsData} />);

  const patientName = screen.getByText(/Purvi Shangvi/i);
  expect(patientName).toBeInTheDocument();

});


test('delete a schedule - success', async () => {

  let mock = new MockAdapter(axios);
  mock.onDelete().reply(200);

  render(<DoctorSchedules patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  const deleteButtons = screen.getAllByText(/Delete/i);
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {});

});

test('delete a schedule - error', async () => {

  let mock = new MockAdapter(axios);
  mock.onDelete().reply(500);

  render(<DoctorSchedules patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  const deleteButtons = screen.getAllByText(/Delete/i);
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {});

});
