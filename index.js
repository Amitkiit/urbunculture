const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/index");
const firebase = require("./firebase/firebaseConfig"); 
const bookingRoutes = require("./routes/bookingRoutes"); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));


app.use("/api/bookings", bookingRoutes); 

app.get("/", (req, res) => {
  res.send("Automated GST Invoicing System is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
