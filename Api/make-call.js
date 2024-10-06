import express from "express";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

// Directly assign environment variables to constants
const accountSid = process.env.TWILIO_ACCOUNT_SID; // No sensitive data is hard-coded
const authToken = process.env.TWILIO_AUTH_TOKEN; // Make sure this is not hard-coded in the file
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Make sure this is not hard-coded in the file

const baseUrl = "https://apitest-navy-nu.vercel.app";

const router = express.Router();
const client = twilio(accountSid, authToken);

router.post("/", async (req, res) => {
  const { to, amountDue } = req.body;

  if (!to || !amountDue) {
    return res.status(400).json({ error: "Missing 'to' or 'amountDue'" });
  }

  try {
    const call = await client.calls.create({
      from: twilioPhoneNumber,
      to,
      url: `${baseUrl}/twiml?amountDue=${amountDue}`,
    });
    res.json({ message: "Call initiated", callSid: call.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
