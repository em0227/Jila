const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require("../../config/config");

router.get("/test", (req, res) => {
    res.send("this is the ticket test route");
});

router.get("/all", async (req, res) => {
    try {
        const data = await db.select().from('tickets');
        res.send(data).status(200);
    } catch (err) {
        res.json({ err }).status(500);
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const ticket = await db('tickets').where({ id });
        const replies = await db('replies').where({ ticket_id: id });
        res.send({ ticket, replies }).status(200);
    } catch (err) {
        res.json({ err }).status(500);
    }
});

router.post("/", async (req, res) => {
    const id = uuidv4();
    const status = 'new';
    const { createdBy, email, title, description, created } = req.body;
    try {
        await db('tickets').insert({
            id,
            status,
            email,
            title,
            description,
            created,
            created_by: createdBy
        })
    } catch (err) {
        res.json({ err }).status(500);
    }
});

//TODO: should the ticket be updated if an reply was added but nothing changed on the ticket?
router.patch("/", async (req, res) => {
    const { ticketID, email, title, description, status, updatedBy, updated } = req.body;

    try {
        await db('tickets').where({ id: ticketID }).update({
            updated,
            updated_by: updatedBy,
            ...email ? { email } : {},
            ...title ? { title } : {},
            ...description ? { description } : {},
            ...status ? { status } : {}
        })
    } catch (err) {
        res.json({ err }).status(500);
    }

});

module.exports = router;