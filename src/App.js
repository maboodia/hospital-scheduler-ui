import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

function App() {
  const [patientsData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/v1/demo/hospital-scheduling/patients',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>

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
      <br/><br/>

      <input type="submit" value="Submit"/>

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
    </div>
  );
}

export default App;
