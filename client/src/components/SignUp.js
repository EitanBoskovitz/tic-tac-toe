import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp() {
    const [user, setUser] = useState(null);
    const cookies = new Cookies();

    const signUp = () => {
        Axios.post("http://localhost:3001/signup", user)
            .then(res => {
                const { token, userID, username, hashedPassword } = res.data;
                cookies.set("token", token);
                cookies.set("userID", userID);
                cookies.set("username", username);
                cookies.set("hashedPassword", hashedPassword);

            })
    };
    return (
        <div>
            <label>Sign Up</label>
            <input placeholder="User Name" onChange={(event) => {
                setUser({ ...user, username: event.target.value })
            }} />
            <input placeholder="Password" onChange={(event) => {
                setUser({ ...user, password: event.target.value })
            }} />
            <button onClick={signUp}> SignUp</button>
        </div>
    )
}

export default SignUp;