import React , { useState }from "react";
import Square from "./Square";
import Axios from "axios";

function Board() {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [player, setPlayer] = useState("X");
    const [turn, setTurn] = useState("X")

    const chooseSquare = async (squarePlacement) => {
        Axios.post("http://localhost:3001/gameboard/choosesquare", {
            board, player, turn, squarePlacement

        }).then(res => {
            const {  board, player, turn } = res.data;
            setBoard(board);
            setPlayer(player);
            setTurn(turn);

        })
    }

    return <div className="board">
        <div className="row">
            <Square chooseSquare={() => {chooseSquare(0)}} value={board[0]}/>
            <Square chooseSquare={() => {chooseSquare(1)}} value={board[1]}/>
            <Square chooseSquare={() => {chooseSquare(2)}} value={board[2]}/>
        </div>
        <div className="row">
            <Square chooseSquare={() => {chooseSquare(3)}} value={board[3]}/>
            <Square chooseSquare={() => {chooseSquare(4)}} value={board[4]}/>
            <Square chooseSquare={() => {chooseSquare(5)}} value={board[5]}/>
        </div>
        <div className="row">
            <Square chooseSquare={() => {chooseSquare(6)}} value={board[6]}/>
            <Square chooseSquare={() => {chooseSquare(7)}} value={board[7]}/>
            <Square chooseSquare={() => {chooseSquare(8)}} value={board[8]}/>
        </div>
    </div>
}

export default Board