import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import * as ApplicationConstants from "./constants/application-constants";

import SchedulesForm from "./components/schedules-form";
import PatientSchedules from "./components/patient-schedules";
import DoctorSchedules from "./components/doctor-schedules";


function App() {
  const [patientsData, setPatientsData] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]);
  const [refreshDate, setRefreshDate] = useState('');
  const [viewName, setSchedulesView] = useState("Doctor View");

  const refreshFunction = () => {
    setRefreshDate(new Date());
  };

  useEffect(() => {

     const fetchData = async () => {
       const [patientsApiResponse, doctorsApiResponse] = await Promise.all([axios(ApplicationConstants.PATIENTS_API_URL), axios(ApplicationConstants.DOCTORS_API_URL)]);
       setPatientsData(patientsApiResponse.data);
       setDoctorsData(doctorsApiResponse.data);
     };

    fetchData();
  }, [refreshDate]);

  return (
    <div className="main-div">

      <h2>Add New Schedule</h2>

      <SchedulesForm patientsData={patientsData} doctorsData={doctorsData} refreshFunction={refreshFunction}/>

      <h2>Schdules List</h2>

      <button type="button" onClick={() => setSchedulesView((viewName === "Patient View") ? "Doctor View" : "Patient View")}>
        {viewName}
      </button>

      <button type="button" onClick={() => refreshFunction()}>
        Refresh
      </button>

      {(viewName !== "Patient View") && <PatientSchedules patientsData={patientsData} doctorsData={doctorsData} refreshFunction={refreshFunction}/>}
      {(viewName !== "Doctor View") && <DoctorSchedules patientsData={patientsData} doctorsData={doctorsData} refreshFunction={refreshFunction}/>}

    </div>
  );
}

export default App;
