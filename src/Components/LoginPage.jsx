import React, { useState, useEffect } from "react";
import axios from "axios";
import SERVER_URL from "../sensitiveStaff/env";

import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [avaliable, setAvaliable] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("name") !== null) {
            navigate("/game");
        }
    }, []);

    const checkIfNameTaken = async (name) => {
        const isTaken = await axios.post(SERVER_URL + "/login", { name });
        return isTaken.data;
    };

    const addNameToLocalStorage = async () => {
        const name = document.getElementById("nameInput").value;
        if ((await checkIfNameTaken(name)) === true) {
            localStorage.setItem("name", name);
            if (name === "") {
                alert("Please enter a name");
            } else {
                setAvaliable(true);
                navigate("/game");
            }
        } else {
            setAvaliable(false);
            console.log("name is alredy in use");
        }
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
            {avaliable === true ? "" : <p>name is alredy in use</p>}
        </>
    );
}

export default LoginPage;
