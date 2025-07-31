const Patient = require('../models/patient');

function createPatient(req, res, body) {
  const patient = JSON.parse(body || '{}');
  if (!patient.zalo_id) {
    res.writeHead(400);
    return res.end('Missing zalo_id');
  }
  Patient.create(patient);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(patient));
}

function getPatient(req, res, zaloId) {
  const patient = Patient.findById(zaloId);
  if (!patient) {
    res.writeHead(404);
    return res.end('Not found');
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(patient));
}

module.exports = { createPatient, getPatient };
