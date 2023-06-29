const express = require("express");
const cors = require("cors");
const gameboardRouters = require("./routes/gameLogicRoutes");
const userRoutes = require('./routes/userRoutes')
const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/gameboard', gameboardRouters);
  
app.listen(3001, () => {
    console.log("Server is running on port 3001");
})