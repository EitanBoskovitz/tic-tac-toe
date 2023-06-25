import React, { useState } from "react";

function Login() {
    const [user, setUser] = useState(null);
    const login = () => {};
    return (
        <div>
            <label>Login</label>
            <input placeholder="User Name" onChange={(event) => {
                setUser({ ...user, username: event.target.value })
            }} />
            <input placeholder="Password" onChange={(event) => {
                setUser({ ...user, password: event.target.value })
            }} />
            <button onClick={login}> Login</button>
        </div>
    )
}

export default Login;