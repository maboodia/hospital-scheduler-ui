import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as ApplicationConstants from "../../constants/application-constants";

const patientsData = require('../test-data/patients-data');
const doctorsData = require('../test-data/doctors-data');

test('renders the application', () => {
  render(<App />);

  const schedulesFormHeader = screen.getByText(/Add New Schedule/i);
  expect(schedulesFormHeader).toBeInTheDocument();

  const schedulesListHeader = screen.getByText(/Schdules List/i);
  expect(schedulesListHeader).toBeInTheDocument();

  const viewButton = screen.getByText(/Doctor View/i);
  expect(viewButton).toBeInTheDocument();

  const refreshButton = screen.getByText(/Refresh/i);
  expect(refreshButton).toBeInTheDocument();

});

test('click the refresh button', async () => {

  let mock = new MockAdapter(axios);
  mock.onGet(ApplicationConstants.PATIENTS_API_URL).reply(200, patientsData);
  mock.onGet(ApplicationConstants.DOCTORS_API_URL).reply(200, doctorsData);

  render(<App />);

  const refreshButton = screen.getByText(/Refresh/i);
  fireEvent.click(refreshButton);

  await waitFor(() => {
    const patientNameList = screen.getAllByText(/Muhamad Aboodia/i);
    expect(patientNameList).toHaveLength(2);
  });

});
