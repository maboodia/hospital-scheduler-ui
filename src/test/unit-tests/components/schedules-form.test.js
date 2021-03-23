import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import SchedulesForm from '../../../components/schedules-form';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const patientsData = require('../../test-data/patients-data');
const doctorsData = require('../../test-data/doctors-data');
const emptyPatientsData = require('../../test-data/empty-patients-data');

test('renders a list of patients', () => {

  render(<SchedulesForm patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  const doctorLabel = screen.getByText(/Doctor/i);
  expect(doctorLabel).toBeInTheDocument();

  const patientLabel = screen.getByText(/Patient/i);
  expect(patientLabel).toBeInTheDocument();

  const selectOptions = screen.getAllByRole('option');
  expect(selectOptions).toHaveLength(15);

  const dateLabel = screen.getByText(/Date/i);
  expect(dateLabel).toBeInTheDocument();

  const submitButton = screen.getByText(/Submit/i);
  expect(submitButton).toBeInTheDocument();

});

test('click the submit button - empty input for doctor', () => {

  render(<SchedulesForm patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  const errorMsg = screen.getByText(/Please Choose a Doctor/i);
  expect(errorMsg).toBeInTheDocument();

});

test('click the submit button - empty input for patient', () => {

  const { getByTestId } = render(<SchedulesForm patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  userEvent.selectOptions(getByTestId("select-doctor"), ["1"]);

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  const errorMsg = screen.getByText(/Please Choose a Patient/i);
  expect(errorMsg).toBeInTheDocument();

});


test('click the submit button - only patient input', () => {

  const { getByTestId } = render(<SchedulesForm patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  userEvent.selectOptions(getByTestId("select-doctor"), ["1"]);
  userEvent.selectOptions(getByTestId("select-patient"), ["1"]);

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  const errorMsg = screen.getByText(/Please Choose a Valid Future Date/i);
  expect(errorMsg).toBeInTheDocument();

});

test('click the submit button - patient and invalid date input', () => {

  const { getByTestId } = render(<SchedulesForm patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  userEvent.selectOptions(getByTestId("select-doctor"), ["1"]);
  userEvent.selectOptions(getByTestId("select-patient"), ["1"]);
  userEvent.type(screen.getByRole("textbox"), null);

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  let errorMsg = screen.getByText(/Please Choose a Valid Future Date/i);
  expect(errorMsg).toBeInTheDocument();

  userEvent.type(screen.getByRole("textbox"), undefined);
  fireEvent.click(submitButton);

  errorMsg = screen.getByText(/Please Choose a Valid Future Date/i);
  expect(errorMsg).toBeInTheDocument();

  userEvent.type(screen.getByRole("textbox"), "invalid date");
  fireEvent.click(submitButton);

  errorMsg = screen.getByText(/Please Choose a Valid Future Date/i);
  expect(errorMsg).toBeInTheDocument();

});

test('click the submit button - patient and past date input', () => {
  
  const { getByTestId } = render(<SchedulesForm patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  userEvent.selectOptions(getByTestId("select-doctor"), ["1"]);
  userEvent.selectOptions(getByTestId("select-patient"), ["1"]);
  userEvent.type(screen.getByRole("textbox"), '03/10/2021 13:00');

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  const errorMsg = screen.getByText(/Please Choose a Valid Future Date/i);
  expect(errorMsg).toBeInTheDocument();

});

test('click the submit button - valid inputs', async () => {

  let mock = new MockAdapter(axios);
  mock.onPost().reply(200);

  const { getByTestId } = render(<SchedulesForm patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  userEvent.selectOptions(getByTestId("select-doctor"), ["1"]);
  userEvent.selectOptions(getByTestId("select-patient"), ["1"]);
  userEvent.type(screen.getByRole("textbox"), '05/10/2050 13:00');

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  await waitFor(() => {});

});

test('click the submit button - valid inputs but failure to submit', async () => {

  let mock = new MockAdapter(axios);
  mock.onPost().reply(500);

  const { getByTestId } = render(<SchedulesForm patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  userEvent.selectOptions(getByTestId("select-doctor"), ["1"]);
  userEvent.selectOptions(getByTestId("select-patient"), ["1"]);
  userEvent.type(screen.getByRole("textbox"), '05/10/2050 13:00');

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    const errorMsg = screen.getByText(/Error Submitting Schedule/i);
    expect(errorMsg).toBeInTheDocument();
  });

});

test('click the submit button - schedule already booked', async () => {

  let mock = new MockAdapter(axios);
  mock.onPost().reply(500);

  const { getByTestId } = render(<SchedulesForm patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  userEvent.selectOptions(getByTestId("select-doctor"), ["2"]);
  userEvent.selectOptions(getByTestId("select-patient"), ["1"]);
  userEvent.type(screen.getByRole("textbox"), '03/22/2050 21:30:00');

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    const errorMsg = screen.getByText(/Schedule is Already Booked/i);
    expect(errorMsg).toBeInTheDocument();
  });

});

test('click the submit button - schedule already set for the patient', async () => {

  let mock = new MockAdapter(axios);
  mock.onPost().reply(500);

  const { getByTestId } = render(<SchedulesForm patientsData={patientsData} doctorsData={doctorsData} refreshFunction={jest.fn()} />);

  userEvent.selectOptions(getByTestId("select-doctor"), ["2"]);
  userEvent.selectOptions(getByTestId("select-patient"), ["1"]);
  userEvent.type(screen.getByRole("textbox"), '03/22/2050 21:10:00');

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    const errorMsg = screen.getByText(/Schedule Already Set for Patient/i);
    expect(errorMsg).toBeInTheDocument();
  });

});
