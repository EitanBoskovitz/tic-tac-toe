const express = require('express')
const { StreamChat } = require('stream-chat');
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const api_key = "eeubfvakebsc"
const api_secret = "3qr38ng6h4qfudvr7583affwkewxjxz72n8vdpubpyxhvke4q8y4kv4hqxjx4334"
const serverClient = StreamChat.getInstance(api_key, api_secret);
let app = express.Router()

//create all the user details and a streamchat token
app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userId = v4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userId);
        res.json({ token, userId, username, hashedPassword });
    } catch (error) {
        res.json(error);
    }

})

//query the stream-chat for all the client users, if the user with login details exists, return it's details
app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body
      const { users } = await serverClient.queryUsers({ name: username });
      if (users.length === 0) {
        return res.json({ message: "User not found" });
      } 
  
    
      const token = serverClient.createToken(users[0].id);
      const passwordMatch = await bcrypt.compare(
        password,
        users[0].hashedPassword
      );
  
      if (passwordMatch) {
        res.json({
          token,
          username,
          userId: users[0].id,
        });
      }
    } catch (error) {
      res.json(error);
    }
  });


module.exports = app