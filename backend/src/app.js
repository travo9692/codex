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
const http = require('http');
const url = require('url');
const { createPatient, getPatient } = require('./controllers/patientController');
const { createAppointment, listAppointments } = require('./controllers/appointmentController');
const { start: startReminder } = require('./scheduler/reminder');

const PORT = process.env.PORT || 3000;

function parseBody(req, callback) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => callback(body));
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const path = parsed.pathname;
  const method = req.method.toUpperCase();

  if (path === '/patients' && method === 'POST') {
    return parseBody(req, body => createPatient(req, res, body));
  }

  if (path.startsWith('/patients/') && method === 'GET') {
    const zaloId = path.split('/')[2];
    return getPatient(req, res, zaloId);
  }

  if (path === '/appointments' && method === 'POST') {
    return parseBody(req, body => createAppointment(req, res, body));
  }

  if (path.startsWith('/appointments/') && method === 'GET') {
    const zaloId = path.split('/')[2];
    return listAppointments(req, res, zaloId);
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startReminder();
});
