import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SchedulesList from '../../../components/schedules-list';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const patientsData = require('../../test-data/patients-data');

test('renders a list of patients', () => {
  render(<SchedulesList patientsData={patientsData} />);

  const patientName = screen.getByText(/Muhamad Aboodia/i);
  expect(patientName).toBeInTheDocument();

});


test('delete a schedule - success', async () => {

  let mock = new MockAdapter(axios);
  mock.onDelete().reply(200);

  render(<SchedulesList patientsData={patientsData} refreshFunction={jest.fn()} />);

  const deleteButtons = screen.getAllByText(/Delete/i);
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {});

});

test('delete a schedule - error', async () => {

  let mock = new MockAdapter(axios);
  mock.onDelete().reply(500);

  render(<SchedulesList patientsData={patientsData} refreshFunction={jest.fn()} />);

  const deleteButtons = screen.getAllByText(/Delete/i);
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {});

});
