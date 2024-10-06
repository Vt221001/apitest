import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message content is required" });
  }

  console.log(message);
  res.status(201).json({ message: "SMS sent", content: message });
});

export default router;
