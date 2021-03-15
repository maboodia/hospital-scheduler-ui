import { render, screen } from '@testing-library/react';
import SchedulesList from '../../../components/schedules-list';


const patientsData = require('../../test-data/patients-data');
const emptyPatientsData = require('../../test-data/empty-patients-data');

test('renders a list of patients', () => {
  render(<SchedulesList patientsData={patientsData}/>);

  const patientName = screen.getByText(/Muhamad Aboodia/i);
  expect(patientName).toBeInTheDocument();

});
