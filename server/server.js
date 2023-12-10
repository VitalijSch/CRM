import express from "express";
import cors from "cors";
import apiRoutes from "./api/api.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});