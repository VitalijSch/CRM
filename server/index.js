import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";
import cors from "cors";
import { config } from "dotenv";

const app = express();
const port = 3001;
config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/customers", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM customer_data");
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/customers", async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber } = req.body;
        const [result] = await db.query("INSERT INTO customer_data (first_name, last_name, email, phone_number) VALUES (?,?,?,?)", [firstName, lastName, email, phoneNumber]);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/customers/:id", async (req, res) => {
    try {
        const { id, firstName, lastName, email, phoneNumber } = req.body;
        const [result] = await db.query("UPDATE customer_data SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE id = ?", [firstName, lastName, email, phoneNumber, id]);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/customers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await db.query("DELETE FROM customer_data WHERE id = ?", id);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});