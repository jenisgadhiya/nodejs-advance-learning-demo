import express from "express";
import User from "../models/User.js";
import { sendEmail } from "../service/sendEmail.js";
import redisClient from "../service/redisClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.send(newUser);
});

router.put("/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  const mailOptions = {
    from: "your-email@example.com",
    to: updatedUser?.email,
    subject: "Update User",
    text: `User updated: ${updatedUser?.id}`,
  };
  // Check Redis if email was sent recently
  const lastSentTime = await redisClient.get(`user:${updatedUser?.id}`);
  // If email was sent less than a minute ago, do not send again
  if (!lastSentTime || Date.now() - parseInt(lastSentTime, 10) > 60000) {
    sendEmail(mailOptions); // Send email
    redisClient.set(`user:${updatedUser?.id}`, Date.now(), {
      EX: 60,
    });
  }
  res.send(updatedUser);
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: "User deleted" });
});

export default router;
