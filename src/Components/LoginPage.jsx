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
        <>
            <img className="logo" src="logo.png" alt="logo" />
            <div>
                <input type="text" id="nameInput" className="nameInput" placeholder="Enter Your Name" />
                <button className="connectButton" onClick={() => addNameToLocalStorage()}>
                    Connect
                </button>
            </div>
        </>
    );
}

export default LoginPage;
