const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../database");

router.post("/", async (req, res) => {
  const id = uuidv4();
  const { ticketId, response, createdBy, created } = req.body;

  try {
    const insertSql =
      "INSERT INTO replies(id, ticket_id, response, created_by, created) VALUES($1, $2, $3, $4, $5)";

    await db.query(insertSql, [id, ticketId, response, createdBy, created]);

    const updateSql =
      "UPDATE tickets set updated_by = $1, updated = $2 where id = $3";

    await db.query(updateSql, [createdBy, created, ticket_id]);

    const updatedData = await db.query(
      `SELECT * FROM replies LEFT JOIN tickets ON tickets.id=replies.ticket_id WHERE replies.ticket_id='${ticketId}'`
    );

    res.status(200).send({ replies: updatedData, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
});

module.exports = router;
