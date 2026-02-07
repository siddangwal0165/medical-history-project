const express = require("express");
const mongoose = require("mongoose");
const Prescription = require("./models/prescription");


const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/medical-history");

app.post("/prescription", async (req, res) => {
  const data = await Prescription.create(req.body);
  res.json(data);
});

app.get("/prescription", async (req, res) => {
  const data = await Prescription.find();
  res.json(data);
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
