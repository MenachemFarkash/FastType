import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const addNameToLocalStorage = () => {
        const name = document.getElementById("nameInput").value;
        localStorage.setItem("name", name);
        navigate("/game");
    };
    return (
        <div>
            <input type="text" id="nameInput" />
            <button onClick={() => addNameToLocalStorage()}>Connect</button>
        </div>
    );
}

export default LoginPage;
