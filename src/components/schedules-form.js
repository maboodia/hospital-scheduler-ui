import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import * as ApplicationConstants from "../constants/application-constants";

export const SchedulesForm = (props) => {

  const {patientsData, refreshFunction} = props;

  const [id, setId] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [successMsg, setSubmissionSuccessMsg] = useState(null);
  const [errorMsg, setSubmissionErrorMsg] = useState(null);

  const submitSchedule = () => {

    setSubmissionErrorMsg(null);
    setSubmissionSuccessMsg(null);

    let proceedWithSchedule = true;

    // Check if id was selected
    if(id === null || id === "") {
      setSubmissionErrorMsg("Please Choose a Patient !");
      return;
    }

    // Check if schedule is valid
    if(scheduleDate === undefined || scheduleDate < Date.now()) {
      setSubmissionErrorMsg("Please Choose a Future Date !");
      return;
    }

    // Check if Schedule is taken
    patientsData.forEach(function (patient) {
      patient.schedules.forEach(function (schedule) {
        let existingDate = schedule.startDate;
        if(scheduleDate.getTime() === new Date(existingDate).getTime()) {
          proceedWithSchedule = false;

          if(id != patient.id) {
            setSubmissionErrorMsg("Schedule is Already Booked !");
          }
          else {
            setSubmissionSuccessMsg("Schedule Already Set for Patient");
          }

        }
      });
    });

    if(!proceedWithSchedule) {
      return;
    }

    let postBody = { date: scheduleDate.getTime()/1000, requestedOn: Date.now()/1000 };

    let postUrl = ApplicationConstants.PATIENTS_API_URL + "/" + id + "/" + ApplicationConstants.SCHEDULES_API_URL_NAME;
    axios.post(postUrl, postBody)
        .then(response => {
          setSubmissionSuccessMsg(response.data);
          refreshFunction();
        })
        .catch(error => {
            console.error('There was an error!', error);
            setSubmissionErrorMsg("Error Submitting Schedule !");
        });
  }

  return (
    <div>

      <label htmlFor="fname">Patient:</label>
      <br/>
      <select onChange={e => setId(e.currentTarget.value)}>
        <option key="empty-option" value=""></option>
        {patientsData.map(item => (
          <option key={item.id} value={item.id}>{item.id} - {item.name}</option>
        ))}
      </select>
      <br/><br/>

      <label htmlFor="lname">Date:</label>
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
  patientsData: PropTypes.array,
  refreshFunction: PropTypes.func
};

export default SchedulesForm;
