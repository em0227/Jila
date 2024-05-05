const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../../config/config");
// const { sql } = require("@vercel/postgres");

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

    await db("tickets").where({ id: ticketId }).update({
      updated: created,
      updated_by: createdBy,
    });

    const updatedData = await db("tickets")
      .join("replies", "tickets.id", "=", "replies.ticket_id")
      .select(
        "replies.id",
        "replies.created",
        "replies.created_by",
        "replies.response"
      );

    res.status(200).send({ replies: updatedData, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
});

module.exports = router;
