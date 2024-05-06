const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../database");
const {
  validateStatus,
  validateEmail,
  validateDate,
} = require("../utils/validations");

router.get("/test", (req, res) => {
  res.send("this is the ticket test route");
});

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await db.query("select * from tickets");
    res.send({ success: true, tickets: rows }).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows: tickets } = await db.query(
      "select * from tickets where id= $1",
      [req.params.id]
    );
    const ticket = tickets[0];
    const { rows: replies } = await await db.query(
      "select * from replies where ticket_id= $1",
      [req.params.id]
    );

    res.send({ ticket, replies, success: true }).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
});

router.post("/", async (req, res) => {
  const id = uuidv4();
  const status = "New";
  const { createdBy, email, title, description, created } = req.body;

  const validated =
    validateEmail(email) &&
    title.length > 0 &&
    createdBy.length > 0 &&
    validateDate(created);

  if (!validated) {
    res.status(400).send({ success: false });
    return;
  }

  try {
    const sql =
      "INSERT INTO tickets(id, status, created_by, email, title, description, created) VALUES($1, $2, $3, $4, $5, $6, $7)";

    await db.query(sql, [
      id,
      status,
      createdBy,
      email,
      title,
      description,
      created,
    ]);

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
});

router.put("/:id", async (req, res) => {
  const { status, updatedBy, updated } = req.body;

  const validated =
    validateStatus(status) && validateDate(updated) && updatedBy === "Admin";

  if (!validated) {
    res.status(400).send({ success: false });
    return;
  }

  try {
    const sql =
      "UPDATE tickets set status = $1, updated_by = $2, updated = $3 where id = $4";

    await db.query(sql, [status, updatedBy, updated, req.params.id]);

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
});

module.exports = router;
