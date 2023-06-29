import React, { useState } from "react";
import { useChatContext , Channel } from "stream-chat-react";
import Game from "./Game"

function JoinGame() {
    //becasuse JoinGame is encased by the Chat component, we are able to get client without usage of props
    const { client } = useChatContext();

    const [rivalUsername, setRivelUsername] = useState("");
    const [channel, setChannel] = useState(null);

    //query for the rival chosen in the input and create a channel consisting of you and the rival
    const createChannel = async () => {
        const response = await client.queryUsers({ name: rivalUsername });
        if (response.users.length === 0) {
            alert("user not found");
            return;
        }

        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id]
        })

        await newChannel.watch();
        setChannel(newChannel);
    }


    return (
        <>
            {channel ?
                (
                    <Channel channel={channel} >
                        <Game channel={channel} />
                    </Channel>
                ) :
                (
                    < div className="joinGame" >
                        <h4>Create Game</h4>
                        <input placeholder="Username of rival" onChange={(event) => {
                            setRivelUsername(event.target.value);
                        }}>
                        </input>
                        <button onClick={createChannel}>Join/Start Game</button>
                    </div >
                )
            }
        </>
    )
}

export default JoinGame;