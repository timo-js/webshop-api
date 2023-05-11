/*
  Posts a new Ticket to ZAMMAD Ticket API utilizing services/ticketService.js
*/

const express = require("express");
const router = express.Router();
const { postNewTicket } = require("../services/ticketService");

const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const ticketBody = `<h3>New Order:</h3>
  <h3>Authorized in Active Directory: ${req.body.orderedBy} at ${
    req.body.orderDate
  }</h3>
  <table style="width:100%">
    <tr>
      <th style="text-align:left;padding-right:15px">Amount</th>
      <th style="text-align:left;padding-right:15px">Article</th>
      <th style="text-align:left;padding-right:15px">Article ID</th>
    </tr>
    ${req.body.orders.map(
      (o) =>
        `<tr>
          <td style="text-align:left;padding-right:15px">${o.amount} x</td>
          <td style="text-align:left;padding-right:15px">${o.name}</td>
          <td style="text-align:left;padding-right:15px">${o.articleId}</td>
        </tr>`
    )}
  </table>
  <h3>Accounts:</h3>
  <table style="width:100%">
    <tr>
      <th style="text-align:left;padding-right:15px">%</th>
      <th style="text-align:left;padding-right:15px">Account</th>
    </tr>
    ${req.body.accounting.map(
      (a) =>
        `<tr>
          <td style="text-align:left;padding-right:15px">${a.percent} %</td>
          <td style="text-align:left;padding-right:15px">${a.account}</td>
        </tr>`
    )}
  </table> 
  
  
  ${
    !req.body.information
      ? `<p></p>`
      : `<h3>More information:</h3>
      <p>${req.body.information}</p>`
  }
  <h3>Total amount:</h3>
  <p>${req.body.priceTotalAmount} €</p>
  `;

  try {
    let response = await postNewTicket(
      req.body.orderedBy,
      req.body.orderDate,
      req.body.orderedByMail,
      ticketBody
    ).catch((e) => {
      throw e;
    });

    res.status(200).send(response.data);
  } catch {
    res.status(500).send(error.message);
  }
});

module.exports = router;
