const Patient = require('../models/patient');

async function createPatient(req, res) {
  const patientData = req.body || {};
  if (!patientData.zalo_id) {
    return res.status(400).send('Missing zalo_id');
  }
  try {
    const patient = await Patient.create(patientData);
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

async function getPatient(req, res) {
  const zaloId = req.params.zalo_id;
  try {
    const patient = await Patient.findOne({ zalo_id: zaloId }).lean();
    if (!patient) {
      return res.status(404).send('Not found');
    }
    res.json(patient);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

module.exports = { createPatient, getPatient };
