require('dotenv').config();
const express = require('express');
const { connect } = require('./db');
const patientController = require('./controllers/patientController');
const appointmentController = require('./controllers/appointmentController');
const { start: startReminder } = require('./scheduler/reminder');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/patients', patientController.createPatient);
app.get('/patients/:zalo_id', patientController.getPatient);
app.post('/appointments', appointmentController.createAppointment);
app.get('/appointments/:zalo_id', appointmentController.listAppointments);

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      startReminder();
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
