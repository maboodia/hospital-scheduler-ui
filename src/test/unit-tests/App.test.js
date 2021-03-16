import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const patientsData = require('../test-data/patients-data');

test('renders the application', () => {
  render(<App />);

  const schedulesFormHeader = screen.getByText(/Add New Schedule/i);
  expect(schedulesFormHeader).toBeInTheDocument();

  const schedulesListHeader = screen.getByText(/Add New Schedule/i);
  expect(schedulesListHeader).toBeInTheDocument();

  const refreshButton = screen.getByText(/Refresh/i);
  expect(refreshButton).toBeInTheDocument();

});

test('click the refresh button', async () => {

  var mock = new MockAdapter(axios);
  mock.onGet('http://localhost:8080/v1/demo/hospital-scheduling/patients').reply(200, patientsData);


  const { getByText } = render(<App />);

  const refreshButton = screen.getByText(/Refresh/i);
  fireEvent.click(refreshButton);

  await waitFor(() => {
    const patientNameList = screen.getAllByText(/Muhamad Aboodia/i);
    expect(patientNameList).toHaveLength(2);
  });

});
