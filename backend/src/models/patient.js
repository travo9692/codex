const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  zalo_id: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  dob: String
});

module.exports = mongoose.model('Patient', patientSchema);
