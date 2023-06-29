import React , { useState }from "react";
import Sqaure from "./Square";

function Board() {
    const [board, setBoard] = useState(Array(9).fill(""));

    return <div className="board">
        <div className="row">
            <Sqaure  value={board[0]}/>
            <Sqaure value={board[1]}/>
            <Sqaure value={board[2]}/>
        </div>
        <div className="row">
            <Sqaure value={board[3]}/>
            <Sqaure value={board[4]}/>
            <Sqaure value={board[5]}/>
        </div>
        <div className="row">
            <Sqaure value={board[6]}/>
            <Sqaure value={board[7]}/>
            <Sqaure value={board[8]}/>
        </div>
    </div>
}

export default Board