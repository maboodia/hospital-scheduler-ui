import PropTypes from 'prop-types';
import axios from 'axios';
import * as ApplicationConstants from "../constants/application-constants";

export const DoctorSchedules = props => {

  const {patientsData, doctorsData, refreshFunction} = props;

  const removeSchedule = (itemId, scheduleId) => {

    let deleteUrl = ApplicationConstants.PATIENTS_API_URL + "/" + itemId + "/" + ApplicationConstants.SCHEDULES_API_URL_NAME + "/" + scheduleId;
    axios.delete(deleteUrl)
        .then(response => {
          refreshFunction();
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }

  return (

    <div>

      {doctorsData.map(item => {
        return (item.schedules.length > 0) ?

        <ul key={"details_" + item.id}>

          <li key={item.id}>Dr. {item.name} (Id: {item.id})</li>

          <ul key={"scheule_" + item.id}>
            {item.schedules.map(schedule => (
              <li key={item.id + schedule.startDate}>
                { patientsData.map(doctor => { return (doctor.id === schedule.patientId) ? doctor.name : null; }) }
                <span> - </span>
                {schedule.startDate} (In { Math.round((new Date(schedule.startDate).getTime() - new Date().getTime()) / 1000 / 60) } Minutes)
                <button key={schedule.patientId + "_" + schedule.id} onClick={() => removeSchedule(schedule.patientId, schedule.id)}>Delete</button>
              </li>
            ))}
          </ul>

        </ul>

        : null;
      })}

    </div>
  );
}

DoctorSchedules.propTypes = {
  patientsData: PropTypes.array,
  doctorsData: PropTypes.array,
  refreshFunction: PropTypes.func
};

export default DoctorSchedules;
