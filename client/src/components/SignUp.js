import React, { useState } from "react";

function SignUp() {
    const [user, setUser] = useState(null);
    const signUp = () => {}
    return (
        <div>
            <label>Sign Up</label>
            <input placeholder="User Name" onChange={(event) => {
                setUser({ ...user, username: event.target.value })
            }} />
            <input placeholder="Password" onChange={(event) => {
                setUser({ ...user, password: event.target.value })
            }} />
            <button onClick={signUp}/> SignUp
        </div>
    )
}