const express = require("express");
const cors = require("cors");
const {StreamChat} = require('stream-chat');
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

const api_key = "eeubfvakebsc"
const api_secret = "3qr38ng6h4qfudvr7583affwkewxjxz72n8vdpubpyxhvke4q8y4kv4hqxjx4334"
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const userID = v4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userID);
        res.json({token, userID, userName, hashedPassword });
    } catch(error) {
        res.json(error);
    }
    
})

app.post("/login", (req, res) => {
    const {userName, password} = req.body
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})