const Appointment = require('../models/appointment');

async function createAppointment(req, res, body) {
  let apptData;
  try {
    apptData = JSON.parse(body || '{}');
  } catch (err) {
    res.writeHead(400);
    return res.end('Invalid JSON');
  }
  if (!apptData.zalo_id || !apptData.appointment_time) {
    res.writeHead(400);
    return res.end('Missing fields');
  }
  try {
    const appt = await Appointment.create(apptData);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(appt));
  } catch (err) {
    res.writeHead(500);
    res.end('Server error');
  }
}

async function listAppointments(req, res, zaloId) {
  try {
    const list = await Appointment.find({ zalo_id: zaloId }).lean();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(list));
  } catch (err) {
    res.writeHead(500);
    res.end('Server error');
  }
}

module.exports = { createAppointment, listAppointments };
