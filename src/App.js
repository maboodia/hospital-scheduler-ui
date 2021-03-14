import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SchedulesForm from "./components/schedules-form";
import SchedulesList from "./components/schedules-list";

function App() {
  const [patientsData, setData] = useState([]);
  const [refreshDate, setRefreshDate] = useState('');

  const refreshFunction = () => {
    setRefreshDate(new Date());
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/v1/demo/hospital-scheduling/patients',
      );

      setData(result.data);
    };

    fetchData();
  }, [refreshDate]);

  return (
    <div className="main-div">

      <h1>Add New Schedule</h1>

      <SchedulesForm patientsData={patientsData} refreshFunction={refreshFunction}/>

      <h1>Schdules List</h1>

      <button type="button" onClick={() => setRefreshDate(new Date())}>
        Refresh
      </button>

      <SchedulesList patientsData={patientsData} />

    </div>
  );
}

export default App;
