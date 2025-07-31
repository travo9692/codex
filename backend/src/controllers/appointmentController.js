const Appointment = require('../models/appointment');

async function createAppointment(req, res) {
  const apptData = req.body || {};
  if (!apptData.zalo_id || !apptData.appointment_time) {
    return res.status(400).send('Missing fields');
  }
  try {
    const appt = await Appointment.create(apptData);
    res.status(201).json(appt);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

async function listAppointments(req, res) {
  const zaloId = req.params.zalo_id;
  try {
    const list = await Appointment.find({ zalo_id: zaloId }).lean();
    res.json(list);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

module.exports = { createAppointment, listAppointments };
