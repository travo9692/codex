const { readData, writeData } = require('../utils/storage');

const FILE = 'patients.json';

function getAll() {
  return readData(FILE);
}

function findById(zaloId) {
  const data = readData(FILE);
  return data.find(p => p.zalo_id === zaloId);
}

function create(patient) {
  const data = readData(FILE);
  data.push(patient);
  writeData(FILE, data);
  return patient;
}

module.exports = { getAll, findById, create };
