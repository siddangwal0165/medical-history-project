import { useEffect, useState } from "react";

function App() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/prescription")
      .then(res => res.json())
      .then(data => setPrescriptions(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/reports")
      .then(res => res.json())
      .then(data => setReports(data));
  }, []);

  return (
    <div>
      <h2>Medical History Dashboard</h2>

      <h3>Prescriptions</h3>
      <ul>
        {prescriptions.map(p => (
          <li key={p._id}>{p.medicines}</li>
        ))}
      </ul>

      <h3>Reports</h3>
      <ul>
        {reports.map(r => (
          <li key={r._id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
