const express = require('express')
let app = express.Router()

//when a player presses on a square, check if the press is viable
//change whose turn and what shape the game should input next
//return the changes
app.post("/choosesquare", async (req, res) => {
    try {
        let { board, player, turn, squarePlacement} = req.body;
        if(turn === player && board[squarePlacement] === ""){
            turn = (player === "X") ? "O" : "X";
            board[squarePlacement] = player;
        }
        res.json({board, player, turn});

    } catch (error) {
        res.json(error)
    }

})

module.exports = app