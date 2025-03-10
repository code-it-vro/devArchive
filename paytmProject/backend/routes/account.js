const express = require("express");
const authMiddleware  = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

// Route to get the user's balance
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Route to transfer balance
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  const { amount, to } = req.body;

  // Input validation
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  if (!to || typeof to !== "string") {
    return res.status(400).json({ message: "Invalid recipient" });
  }

  try {
    session.startTransaction();

    // Fetch the sender's account
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    // Fetch the recipient's account
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Recipient account not found",
      });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.status(200).json({
      message: "Transfer successful",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Transfer failed", error: error.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
