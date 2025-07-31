const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  zalo_id: { type: String, required: true },
  doctor_name: String,
  service: String,
  appointment_time: { type: Date, required: true },
  note: String
});

appointmentSchema.statics.upcomingWithin = function(minutes) {
  const now = new Date();
  const end = new Date(now.getTime() + minutes * 60000);
  return this.find({ appointment_time: { $gte: now, $lte: end } });
};

module.exports = mongoose.model('Appointment', appointmentSchema);
