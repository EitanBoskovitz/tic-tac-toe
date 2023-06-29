import React , { useState }from "react";
import {useChannelStateContext, useChatContext} from "stream-chat-react"
import Square from "./Square";
import Axios from "axios";

function Board() {
    //because we encased the game component with the stream chat channel compoent, we are able to get the channel without the use of props
    const {channel } = useChannelStateContext();
    const {client} = useChatContext();

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

            //after a player presses a square, send an event to the channel, that all users of the channel will recieve
        }).then( await channel.sendEvent(
            {
                type: "game-move",
                data: {squarePlacement, player}
            }
        ))

    }

//when the event is received, if this client is not the player that sent the event, mirror the other player's board 
channel.on((event) => {
    if(event.type == "game-move" && event.user.id !== client.userID){
        const currentPlayer = event.data.player === "X" ? "O" : "X";
        setPlayer(currentPlayer)
        setTurn(currentPlayer)
        setBoard(
            board.map((value, index) => {
                if( index === event.data.squarePlacement && value === ""){
                    return event.data.player;
                }
                    return value;
            })
        );
    }
})
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