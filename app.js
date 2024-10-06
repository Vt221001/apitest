import express from "express";
import dotenv from "dotenv";
import sendSMSRoute from "./Api/send-sms.js";
import makeCallRoute from "./Api/make-call.js";
import twimlRoute from "./Api/twiml.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Local deployment successful");
});

// Route for sending SMS
app.use("/send-sms", sendSMSRoute);

// Route for making calls
app.use("/make-call", makeCallRoute);

// TwiML route
app.use("/twiml", twimlRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen on the defined port
app.listen(port, () => {
  console.log(`Server running locally on port ${port}`);
});
