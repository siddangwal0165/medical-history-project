const express = require("express");
const mongoose = require("mongoose");
const Prescription = require("./models/prescription");
const Report = require("./models/report");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/medical-history");

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.post("/prescription", async (req, res) => {
  const data = await Prescription.create(req.body);
  res.json(data);
});

app.get("/prescription", async (req, res) => {
  const data = await Prescription.find();
  res.json(data);
});

app.post("/reports", async (req, res) => {
  const data = await Report.create(req.body);
  res.json(data);
});

app.get("/reports", async (req, res) => {
  const data = await Report.find();
  res.json(data);
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
