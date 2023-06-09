import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowCircleLeft } from "react-icons/fa";
import SERVER_URL from "../sensitiveStaff/env";
import { useNavigate } from "react-router-dom";

function LeaderBoard() {
    const navigate = useNavigate();
    const [recordsList, setRecordsList] = useState([]);
    const getRecordsList = async () => {
        const records = await axios.get(SERVER_URL + "/records");
        console.log(records.data);
        setRecordsList(records.data);
        return records.data.sort((a, b) => b.w10 - a.w10);
    };

    useEffect(() => {
        getRecordsList();
    }, []);
    return (
        <div>
            <img className="logo" src="logo.png" alt="logo" />
            <h1>Record Table</h1>
            <table className="leaderBoardTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>WPM</th>
                        <th>Accuracy</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsList?.map((record, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{record.name}</td>
                                <td>{record.w10}</td>
                                <td>{record.a10}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="restartButton" onClick={() => navigate("/game")}>
                <FaArrowCircleLeft />
                <p>return</p>
            </div>
        </div>
    );
}

export default LeaderBoard;
