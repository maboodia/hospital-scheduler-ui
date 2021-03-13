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
    <table>
      <thead>
        <th>Patient Name</th>
        <th>Schedule</th>
      </thead>
      <tbody>
        {patientsData.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.schedules[0].startDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
