const Booking = require("../models/Booking");
const gstService = require("../services/gstService");
const firestoreService = require("../services/firestoreService");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { name, totalBookingAmount, status } = req.body;
    const newBooking = await Booking.create({ name, totalBookingAmount, status });
    await firestoreService.addBookingToFirestore(newBooking); // Sync with Firestore
    res.status(201).send({ status: true, message: "Booking created successfully", data: newBooking });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).send({ status: true, data: bookings });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).send({ status: false, message: "Booking not found" });

    booking.status = status;
    await booking.save();

    if (status === "finished") {
      await gstService.calculateAndFileGST(booking);
    }

    res.status(200).send({ status: true, message: "Booking updated successfully", data: booking });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};
