const Appointment = require('../models/appointment');

function start() {
  setInterval(() => {
    const upcoming = Appointment.upcomingWithin(60); // next 60 minutes
    upcoming.forEach(appt => {
      console.log(`Reminder: appointment for ${appt.zalo_id} at ${appt.appointment_time}`);
    });
  }, 60 * 1000); // every minute
}

module.exports = { start };
