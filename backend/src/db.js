const mongoose = require('mongoose');

function connect() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/zalo_demo';
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { connect };
