// const connection = require('../database');
// const { calculateGST, saveGSTInvoice } = require('./gstService');

// const processFinishedBookings = () => {
//   connection.query(
//     'SELECT * FROM bookings WHERE status = "finished"',
//     (err, results) => {
//       if (err) {
//         console.error('Error fetching bookings:', err);
//         return;
//       }

//       results.forEach((booking) => {
//         const { id, total_booking_amount, customer_state, business_state } = booking;

//         // Calculate GST
//         const gstData = calculateGST(total_booking_amount, customer_state, business_state);

//         // Save GST invoice
//         saveGSTInvoice(id, gstData);

//         // Update booking status to 'processed'
//         connection.query(
//           'UPDATE bookings SET status = "processed" WHERE id = ?',
//           [id],
//           (updateErr) => {
//             if (updateErr) {
//               console.error(`Error updating booking ID ${id}:`, updateErr);
//             } else {
//               console.log(`Booking ID ${id} marked as processed.`);
//             }
//           }
//         );
//       });
//     }
//   );
// };

// module.exports = { processFinishedBookings };
