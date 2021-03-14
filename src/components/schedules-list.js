import PropTypes from 'prop-types';

export const SchedulesList = props => {

  const {patientsData} = props;

  return (

    <div>

      {patientsData.map(item => {
        return (item.schedules.length > 0) ?

        <ul key={"details_" + item.id}>

          <li key={item.id}>{item.name} (Id: {item.id})</li>

          <ul key={"scheule_" + item.id}>
            {item.schedules.map(schedule => (
              <li key={item.id + schedule.startDate}>{schedule.startDate}</li>
            ))}
          </ul>

        </ul>
        
        : null;
      })}

    </div>
  );
}

SchedulesList.propTypes = {
  patientsData: PropTypes.array
};

export default SchedulesList;
