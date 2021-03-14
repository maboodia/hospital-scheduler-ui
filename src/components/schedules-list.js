import PropTypes from 'prop-types';

export const SchedulesList = props => {

  const {patientsData} = props;

  return (

    <div>

      {patientsData.map(item => {
        return (item.schedules.length > 0) ?
        <ul>
        <li>{item.name} (Id: {item.id})</li>
        {item.schedules.map(item => (
          <ul>
            <li>{item.startDate}</li>
          </ul>
        ))}
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
