const Appointment = require('../models/appointment');

function start() {
  setInterval(async () => {
    try {
      const upcoming = await Appointment.upcomingWithin(60); // next 60 minutes
      upcoming.forEach(appt => {
        console.log(`Reminder: appointment for ${appt.zalo_id} at ${appt.appointment_time}`);
      });
    } catch (err) {
      console.error('Reminder error', err);
    }
  }, 60 * 1000); // every minute
}

module.exports = { start };
