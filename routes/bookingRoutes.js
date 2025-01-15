const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Booking Routes
router.post("/create", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.patch("/update-status/:id", bookingController.updateBookingStatus);

module.exports = router;
