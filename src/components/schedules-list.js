import PropTypes from 'prop-types';
import axios from 'axios';
import * as ApplicationConstants from "../constants/application-constants";

export const SchedulesList = props => {

  const {patientsData, refreshFunction} = props;

  const removeSchedule = (scheduleId) => {

    let deleteUrl = ApplicationConstants.SCHEDULES_API_URL + ApplicationConstants.URL_SEPERATOR + scheduleId;
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
              <li key={item.id + schedule.startDate}>{schedule.startDate}
                <button key={item.id + "_" + schedule.id} onClick={() => removeSchedule(schedule.id)}>Delete</button>
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
