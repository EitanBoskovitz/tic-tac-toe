const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const userID = v4();
        const hashedPassword = await bcrypt.hash(password, 10);
        res.json({ userID, userName, hashedPassword });
    } catch(error) {
        res.json(error);
    }
    
})


app.listen(3001, () => {
    console.log("Server is running on port 3001");
})