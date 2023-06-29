const express = require('express')
let app = express.Router()
const {patterns} = require('../winningPatterns');

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

app.post("/checkwin", async (req, res) => {
    try {
        let { board } = req.body;
        //for each winning pattern, take the first number of the pattern (correlating to the index of the board)
        //if isnt set on that value, return
        patterns.forEach((currPattern) => {
            const firstPlayer = board[currPattern[0]];
            if (firstPlayer == "") return;
            let foundWinningPattern = true;

            //continue to iterate on the pattern, if one of the numbers of the pattern doesnt match the mark at the board index, theres no winning pattern
            currPattern.forEach((index) => {
                if (board[index] != firstPlayer) {
                    foundWinningPattern = false;
                }
            });

            //if there is a winning pattern, return the winner and a state that he won
            if (foundWinningPattern) {
                res.json({ winner: board[currPattern[0]], state: "won" });
            }
        });
        res.send({ message: "no winner" })
    } catch (error) {
        res.json(error)
    }

})

module.exports = app