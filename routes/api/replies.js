const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../../config/config");

router.post("/", async (req, res) => {
  const id = uuidv4();
  const { ticketId, response, createdBy, created } = req.body;

  try {
    await db("replies").insert({
      id,
      response,
      created,
      ...{ ticket_id: ticketId },
      ...{ created_by: createdBy },
    });

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
});
