const express = require("express");
const router = express.Router();
const db = require("../../config/config");

router.get("/test", (req, res) => {
    res.send("this is the ticket test route");
});

//TODO
router.get("/all");

//TODO
//should also return all the replies associated to the ticket
router.get("/:id");

//TODO: check bluebird docs
router.post("/", (req, res) => {
    const status = 'new';
    const { createdBy, email, title, description, created } = req.body;
    return db
        .none(
            `INSERT into tickets(id, created_by, email, title, description, status, created)
             VALUES($1, $2, $3, $4, $5, $6, $7)`,
            [id, createdBy, email, title, description, status, created]
        )
        .then(() => {
            res.json({ success: true }).status(200);
        })
        .catch((err) => {
            res.json({ err }).status(500);
        });
});

//should the ticket be updated if an reply was added but nothing changed on the ticket?
router.patch("/", (req, res) => {
    const { ticketID, email, title, description, status, updatedBy, updated } = req.body;

    db.none(`UPDATE tickets 
        SET email = COALESCE($2, email),
        title = COALESCE($3, title),
        description = COALESCE($4, description),
        status = COALESCE($5, status),
        updated_by = $6,
        updated = $7,
        WHERE id = $1`, [ticketID, email, title, description, status, updatedBy, updated])
        .then(() => {
            res.json({ success: true }).status(200);
        })
        .catch((err) => {
            res.json({ err }).status(500);
        });
});

module.exports = router;