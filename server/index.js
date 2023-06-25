const express = require("express");
const cors = require("cors");
const { StreamChat } = require('stream-chat');
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
        const { username, password } = req.body;
        const userID = v4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userID);
        res.json({ token, userID, username, hashedPassword });
    } catch (error) {
        res.json(error);
    }

})

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const { users } = await serverClient.queryUsers({ name: username });
        if (users.length === 0) return res.json({ message: "user not found" });

        const token = serverClient.createToken(users[0].id);
        const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword)

        if (passwordMatch) {
            res.json({
                token,
                username,
                userID: users[0].id,
            })
        }
    }catch(error){
        res.json(error);
    }
    
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})