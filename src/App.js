import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

function App() {
  const [patientsData, setData] = useState([]);
  const [refreshDate, setRefreshDate] = useState('');
  const [successMsg, setSubmissionSuccessMsg] = useState(null);
  const [errorMsg, setSubmissionErrorMsg] = useState(null);

  const submitSchedule = () => {
    axios.post('http://localhost:8080/v1/demo/hospital-scheduling/schedules/1', {"date": 12345, "requestedOn": 12345})
        .then(response => {
          setSubmissionErrorMsg(null);
          setSubmissionSuccessMsg(response.data);
          setRefreshDate(new Date());
        })
        .catch(error => {
            console.error('There was an error!', error);
            setSubmissionSuccessMsg(null);
            setSubmissionErrorMsg("Error Sunmitting Schedule !");
        });
  }

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
    <div class="main-div">

      <h1>Add New Schedule</h1>

      <label for="fname">Pateint:</label>
      <br/>
      <select>
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
      />
      <br/>

      <button type="button" onClick={submitSchedule}>
        Submit
      </button>
      <p class="success-msg">{successMsg}</p>
      <p class="error-msg">{errorMsg}</p>

      <h1>Schdules List</h1>

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

      <button type="button" onClick={() => setRefreshDate(new Date())}>
        Refresh
      </button>
    </div>
  );
}

export default App;
