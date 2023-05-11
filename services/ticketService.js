/*
  exports HTTP POST function utilizing ZAMMAD's REST API Client to create a new ticket (https://docs.zammad.org/en/latest/api/intro.html#api-clients)
  few changes have to be made to work properly:
    ZAMMAD_URL_ENDPOINT
    ZAMMAD_TOKEN
    GROUP_ID
    OWNER_ID
*/

const axios = require("axios");

const URL_ENDPOINT = "ZAMMAD_URL_ENDPOINT";
const token = "ZAMMAD_TOKEN";

async function postNewTicket(orderedBy, orderDate, orderedByMail, body) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${URL_ENDPOINT}/tickets`,
        {
          title: `Ordered by: ${orderedBy}; Date: ${orderDate}`,
          group: "GROUP_ID",
          owner_id: "OWNER_ID",
          customer: orderedByMail,
          article: {
            subject: "ORDER",
            body: body,
            type: "note",
            content_type: "text/html",
            internal: false,
          },
        },

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        return resolve(response);
      })
      .catch((e) => {
        return reject(e);
      });
  });
}

exports.postNewTicket = postNewTicket;
