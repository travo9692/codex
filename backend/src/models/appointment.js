const { readData, writeData } = require('../utils/storage');

const FILE = 'appointments.json';

function getByZaloId(zaloId) {
  const data = readData(FILE);
  return data.filter(a => a.zalo_id === zaloId);
}

function create(appt) {
  const data = readData(FILE);
  data.push(appt);
  writeData(FILE, data);
  return appt;
}

function upcomingWithin(minutes) {
  const data = readData(FILE);
  const now = Date.now();
  const end = now + minutes * 60 * 1000;
  return data.filter(a => {
    const t = new Date(a.appointment_time).getTime();
    return t >= now && t <= end;
  });
}

module.exports = { getByZaloId, create, upcomingWithin };
