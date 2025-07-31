const Patient = require('../models/patient');

async function createPatient(req, res, body) {
  let patientData;
  try {
    patientData = JSON.parse(body || '{}');
  } catch (err) {
    res.writeHead(400);
    return res.end('Invalid JSON');
  }
  if (!patientData.zalo_id) {
    res.writeHead(400);
    return res.end('Missing zalo_id');
  }
  try {
    const patient = await Patient.create(patientData);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(patient));
  } catch (err) {
    res.writeHead(500);
    res.end('Server error');
  }
}

async function getPatient(req, res, zaloId) {
  try {
    const patient = await Patient.findOne({ zalo_id: zaloId }).lean();
    if (!patient) {
      res.writeHead(404);
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(patient));
  } catch (err) {
    res.writeHead(500);
    res.end('Server error');
  }
}

module.exports = { createPatient, getPatient };
