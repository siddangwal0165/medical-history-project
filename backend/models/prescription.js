const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  medicines: String,
  date: String,
  notes: String
},
{ timestamps: true }
);
 

module.exports = mongoose.model("Prescription", prescriptionSchema);
