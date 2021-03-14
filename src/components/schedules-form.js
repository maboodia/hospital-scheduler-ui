import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

export const SchedulesForm = props => {

  const {patientsData} = props;

  const [id, setId] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [successMsg, setSubmissionSuccessMsg] = useState(null);
  const [errorMsg, setSubmissionErrorMsg] = useState(null);

  const submitSchedule = () => {
    setSubmissionErrorMsg(null);
    setSubmissionSuccessMsg(null);

    if(id === null) {
      setSubmissionErrorMsg("Please Choose a Patient !");
      return;
    }

    if(scheduleDate === undefined || scheduleDate < Date.now()) {
      setSubmissionErrorMsg("Please Choose a Future Date !");
      return;
    }

    let postBody = {date: scheduleDate.getTime()/1000, requestedOn: Date.now()/1000};

    let postUrl='http://localhost:8080/v1/demo/hospital-scheduling/schedules/' + id;
    axios.post(postUrl, postBody)
        .then(response => {
          setSubmissionSuccessMsg(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
            setSubmissionErrorMsg("Error Sunmitting Schedule !");
        });
  }

  return (
    <div>

      <label for="fname">Pateint:</label>
      <br/>
      <select onChange={e => setId(e.currentTarget.value)}>
        <option value="" selected disabled hidden></option>
        {patientsData.map(item => (
          <option value={item.id}>{item.id} - {item.name}</option>
        ))}
      </select>
      <br/><br/>

      <label for="lname">Date:</label>
      <br/>
      <Datetime
        timeConstraints={{ hours: { min: 0, max: 23 },
                         minutes: {step:10} }}
        onChange={e => setScheduleDate(e.toDate())}
      />
      <br/>

      <button type="button" onClick={submitSchedule}>
        Submit
      </button>
      <p className="success-msg">{successMsg}</p>
      <p className="error-msg">{errorMsg}</p>

    </div>
  );
}

SchedulesForm.propTypes = {
  patientsData: PropTypes.array
};

export default SchedulesForm;
