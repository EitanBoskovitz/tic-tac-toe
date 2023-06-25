import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies();

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username,
            password
        })
            .then(res => {
                const { token, userID, username } = res.data;
                cookies.set("token", token);
                cookies.set("userID", userID);
                cookies.set("username", username);

            })
    };
    return (
        <div>
            <label>Login</label>
            <input placeholder="User Name" onChange={(event) => {
                setUsername(event.target.value);
            }} />
            <input placeholder="Password" onChange={(event) => {
                setPassword(event.target.value);
            }} />
            <button onClick={login}> Login</button>
        </div>
    )
}

export default Login;