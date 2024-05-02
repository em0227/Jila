const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require("../../config/config");

router.get("/test", (req, res) => {
    res.send("this is the ticket test route");
});

//TODO
router.get("/all", (req, res) => {
    db.any()
});

//TODO
//should also return all the replies associated to the ticket
router.get("/:id");

router.post("/", (req, res) => {
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
router.patch("/", (req, res) => {
    const { ticketID, email, title, description, status, updatedBy, updated } = req.body;

    try {
        db('tickets').where({ id: ticketID }).update({
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