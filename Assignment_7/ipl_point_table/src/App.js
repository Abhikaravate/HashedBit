import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/FreSauce/json-ipl/data');
        const data = await response.json();

        const sortedData = data.sort((a, b) => b.NRR - a.NRR);
        
        setTeams(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>IPL 2022 Points Table</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Team</th>
              <th>Matches</th>
              <th>Won</th>
              <th>Lost</th>
              <th>Tied</th>
              <th>NRR</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.No}>
                <td>{team.No}</td>
                <td>{team.Team}</td>
                <td>{team.Matches}</td>
                <td>{team.Won}</td>
                <td>{team.Lost}</td>
                <td>{team.Tied}</td>
                <td>{team.NRR}</td>
                <td>{team.Points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;