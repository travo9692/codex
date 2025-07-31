const fs = require('fs');
const path = require('path');

function readData(file) {
  const filePath = path.join(__dirname, '..', 'data', file);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

function writeData(file, data) {
  const filePath = path.join(__dirname, '..', 'data', file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
