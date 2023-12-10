import express from "express";
import db from "../db/db.js";

const router = express.Router();

router.get("/customers", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM customer_data");
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/customers", async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber } = req.body;
        const [result] = await db.query("INSERT INTO customer_data (first_name, last_name, email, phone_number) VALUES (?,?,?,?)", [firstName, lastName, email, phoneNumber]);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/customers/:id", async (req, res) => {
    try {
        const { id, firstName, lastName, email, phoneNumber } = req.body;
        const [result] = await db.query("UPDATE customer_data SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE id = ?", [firstName, lastName, email, phoneNumber, id]);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/customers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await db.query("DELETE FROM customer_data WHERE id = ?", id);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;