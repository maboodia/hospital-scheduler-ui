import PropTypes from 'prop-types';
import axios from 'axios';
import * as ApplicationConstants from "../constants/application-constants";

export const SchedulesList = props => {

  const {patientsData, refreshFunction} = props;

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

      {patientsData.map(item => {
        return (item.schedules.length > 0) ?

        <ul key={"details_" + item.id}>

          <li key={item.id}>{item.name} (Id: {item.id})</li>

          <ul key={"scheule_" + item.id}>
            {item.schedules.map(schedule => (
              <li key={item.id + schedule.startDate}>{schedule.startDate} ({ Math.round((new Date(schedule.startDate).getTime() - new Date().getTime()) / 1000 / 60) } Minutes from Now)
                <button key={item.id + "_" + schedule.id} onClick={() => removeSchedule(item.id, schedule.id)}>Delete</button>
              </li>
            ))}
          </ul>

        </ul>

        : null;
      })}

    </div>
  );
}

SchedulesList.propTypes = {
  patientsData: PropTypes.array,
  refreshFunction: PropTypes.func
};

export default SchedulesList;
