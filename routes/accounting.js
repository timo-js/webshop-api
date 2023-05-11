const express = require("express");
const { getAccountingData } = require("../services/accountingService");
const router = express.Router();

const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const accountingData = await getAccountingData;
  res.send(accountingData);
});

module.exports = router;
