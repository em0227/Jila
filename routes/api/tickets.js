const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../../config/config");

router.get("/test", (req, res) => {
  res.send("this is the ticket test route");
});

router.get("/all", async (req, res, next) => {
  try {
    const data = await db.select().from("tickets");
    res.send({ success: true, data }).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
});

//tickets/2
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    //TODO join the queries?
    const ticket = await db("tickets").where({ id }).first();
    const replies = await db("replies").where({ ticket_id: id });
    res.send({ ticket, replies, success: true }).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
});

router.post("/", async (req, res) => {
  const id = uuidv4();
  const status = "new";
  const { createdBy, email, title, description, created } = req.body;

  try {
    await db("tickets").insert({
      id,
      status,
      email,
      title,
      description,
      created,
      ...{ created_by: createdBy },
    });

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
});

//TODO: should the ticket be updated if an reply was added but nothing changed on the ticket?
router.patch("/:id", async (req, res) => {
  const { status, updatedBy, updated, reply } = req.body;

  try {
    await db("tickets").where({ id: ticketId }).update({
      updated,
      updated_by: updatedBy,
      status,
    });

    await db("replies");

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
});

module.exports = router;
