import express from "express";
import twilio from "twilio";

const router = express.Router();

router.get("/", (req, res) => {
  const { amountDue } = req.query;

  if (!amountDue) {
    return res.status(400).send("Amount due is required");
  }

  const twimlResponse = new twilio.twiml.VoiceResponse();
  twimlResponse.say(
    {
      voice: "alice",
    },
    `Hello, this is a reminder that your due amount is ${amountDue} dollars. Please make your payment as soon as possible.`
  );

  res.type("text/xml");
  res.send(twimlResponse.toString());
});

export default router;
