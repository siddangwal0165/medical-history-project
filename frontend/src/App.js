import { useEffect, useState } from "react";

function App() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);

  // form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [notes, setNotes] = useState("");

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

  const submitReport = () => {
    fetch("http://localhost:5000/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        type,
        reportDate,
        notes
      })
    })
      .then(res => res.json())
      .then(data => {
        setReports([...reports, data]);
        setTitle("");
        setType("");
        setReportDate("");
        setNotes("");
      });
  };

  return (
    <div>
      <h2>Medical History Dashboard</h2>

      <h3>Prescriptions</h3>
      <ul>
        {prescriptions.map(p => (
          <li key={p._id}>{p.medicines}</li>
        ))}
      </ul>

      <h3>Add Report</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />
      <input
        placeholder="Type"
        value={type}
        onChange={e => setType(e.target.value)}
      />
      <br />
      <input
        placeholder="Report Date"
        value={reportDate}
        onChange={e => setReportDate(e.target.value)}
      />
      <br />
      <input
        placeholder="Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <br />
      <button onClick={submitReport}>Save Report</button>

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
