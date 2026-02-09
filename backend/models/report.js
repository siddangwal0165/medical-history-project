const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    reportDate: String,
    notes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
