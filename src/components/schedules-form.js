import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import * as ApplicationConstants from "../constants/application-constants";

export const SchedulesForm = (props) => {

  const {patientsData, doctorsData, refreshFunction} = props;

  const [doctorId, setDoctorId] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [successMsg, setSubmissionSuccessMsg] = useState(null);
  const [errorMsg, setSubmissionErrorMsg] = useState(null);

  const submitSchedule = () => {

    setSubmissionErrorMsg(null);
    setSubmissionSuccessMsg(null);

    let proceedWithSchedule = true;

    // Check if doctor was selected
    if(doctorId === null || doctorId === "") {
      setSubmissionErrorMsg("Please Choose a Doctor !");
      return;
    }

    // Check if patient was selected
    if(patientId === null || patientId === "") {
      setSubmissionErrorMsg("Please Choose a Patient !");
      return;
    }

    // Check if schedule is valid
    if(scheduleDate === undefined || scheduleDate === null || ! moment(scheduleDate).isValid() || new Date(scheduleDate).getTime() < Date.now()) {
      setSubmissionErrorMsg("Please Choose a Valid Future Date !");
      return;
    }

    const requestedDate = new Date(scheduleDate);

    // Check if Schedule is taken
    patientsData.forEach(function (patient) {
      patient.schedules.forEach(function (schedule) {
        let existingDate = schedule.startDate;
        if(requestedDate.getTime() === new Date(existingDate).getTime()) {

          if (patientId == patient.id) {
            setSubmissionSuccessMsg("Schedule Already Set for Patient !");
            proceedWithSchedule = false;
          }
          else if(schedule.doctorId == doctorId) {
            setSubmissionErrorMsg("Schedule is Already Booked !");
            proceedWithSchedule = false;
          }

        }
      });
    });

    if(!proceedWithSchedule) {
      return;
    }

    let postBody = { doctorId: doctorId, date: requestedDate.getTime()/1000, requestedOn: Date.now()/1000 };

    let postUrl = ApplicationConstants.PATIENTS_API_URL + "/" + patientId + "/" + ApplicationConstants.SCHEDULES_API_URL_NAME;
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

      <label htmlFor="fname">Doctor:</label>
      <br/>
      <select data-testid="select-option" onChange={e => setDoctorId(e.currentTarget.value)}>
        <option key="dr-empty-option" value=""></option>
        {doctorsData.map(item => (
          <option key={"doctor_" + item.id} value={item.id}>{item.id} - {item.name}</option>
        ))}
      </select>
      <br/><br/>

      <label htmlFor="fname">Patient:</label>
      <br/>
      <select data-testid="select-option" onChange={e => setPatientId(e.currentTarget.value)}>
        <option key="pt-empty-option" value=""></option>
        {patientsData.map(item => (
          <option key={"patient_" + item.id} value={item.id}>{item.id} - {item.name}</option>
        ))}
      </select>
      <br/><br/>

      <label htmlFor="lname">Date:</label>
      <br/>
      <Datetime
        timeConstraints={{ hours: { min: 0, max: 23 },
                         minutes: {step:10} }}
        onChange={e => setScheduleDate(e)}
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
  doctorsData: PropTypes.array,
  refreshFunction: PropTypes.func
};

export default SchedulesForm;
