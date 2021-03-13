import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
