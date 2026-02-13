import { useEffect, useState } from "react";

function App() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);

  // Prescription form state
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [medicines, setMedicines] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  // Report form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [reportNotes, setReportNotes] = useState("");

  // Load prescriptions
  useEffect(() => {
    fetch("http://localhost:5000/prescription")
      .then(res => res.json())
      .then(data => setPrescriptions(data));
  }, []);

  // Load reports
  useEffect(() => {
    fetch("http://localhost:5000/reports")
      .then(res => res.json())
      .then(data => setReports(data));
  }, []);

  // Save prescription
  const savePrescription = () => {
    fetch("http://localhost:5000/prescription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName,
        doctorName,
        medicines,
        date,
        notes
      })
    })
      .then(res => res.json())
      .then(data => {
        setPrescriptions([...prescriptions, data]);
        setPatientName("");
        setDoctorName("");
        setMedicines("");
        setDate("");
        setNotes("");
      });
  };

  // Save report
  const saveReport = () => {
    fetch("http://localhost:5000/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        type,
        reportDate,
        notes: reportNotes
      })
    })
      .then(res => res.json())
      .then(data => {
        setReports([...reports, data]);
        setTitle("");
        setType("");
        setReportDate("");
        setReportNotes("");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Medical History Dashboard</h2>

      <h3>Add Prescription</h3>
      <input placeholder="Patient Name" value={patientName} onChange={e => setPatientName(e.target.value)} /><br/>
      <input placeholder="Doctor Name" value={doctorName} onChange={e => setDoctorName(e.target.value)} /><br/>
      <input placeholder="Medicines" value={medicines} onChange={e => setMedicines(e.target.value)} /><br/>
      <input placeholder="Date" value={date} onChange={e => setDate(e.target.value)} /><br/>
      <input placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} /><br/>
      <button onClick={savePrescription}>Save Prescription</button>

      <h3>Prescriptions</h3>
      <ul>
        {prescriptions.map(p => (
          <li key={p._id}>{p.medicines}</li>
        ))}
      </ul>

      <h3>Add Report</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br/>
      <input placeholder="Type" value={type} onChange={e => setType(e.target.value)} /><br/>
      <input placeholder="Report Date" value={reportDate} onChange={e => setReportDate(e.target.value)} /><br/>
      <input placeholder="Notes" value={reportNotes} onChange={e => setReportNotes(e.target.value)} /><br/>
      <button onClick={saveReport}>Save Report</button>

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
