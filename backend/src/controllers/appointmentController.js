const Appointment = require('../models/appointment');

function createAppointment(req, res, body) {
  const appt = JSON.parse(body || '{}');
  if (!appt.zalo_id || !appt.appointment_time) {
    res.writeHead(400);
    return res.end('Missing fields');
  }
  Appointment.create(appt);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(appt));
}

function listAppointments(req, res, zaloId) {
  const list = Appointment.getByZaloId(zaloId);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(list));
}

module.exports = { createAppointment, listAppointments };
