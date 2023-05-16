const express = require("express");
// const { getAccountingData } = require("../services/accountingService");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  // const accountingData = await getAccountingData;
  // res.send(accountingData);
  const accountingData = [
    {
      LfdNr: "1",
      KSKT: "10",
      KST_BEZ: "Geschäftsführung",
      KST: "10 Geschäftsführung",
      FB_Bezeichnung: "10 Geschäftsführung",
      "": null,
    },
    {
      LfdNr: "2",
      KSKT: "20",
      KST_BEZ: "Stabstellen",
      KST: "20 Stabstellen",
      FB_Bezeichnung: "20 Stabstellen",
      "": null,
    },
    {
      LfdNr: "3",
      KSKT: "30",
      KST_BEZ: "Buchhaltung",
      KST: "30 Buchhaltung",
      FB_Bezeichnung: "30 Buchhaltung",
      "": null,
    },
  ];
  res.send(accountingData);
});

module.exports = router;
