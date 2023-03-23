import React, { useState, useEffect } from "react";
import axios from "axios";
import SERVER_URL from "../sensitiveStaff/env";

function LeaderBoard() {
    const [recordsList, setRecordsList] = useState([]);
    const getRecordsList = async () => {
        const records = await axios.get(SERVER_URL + "/records");
        console.log(records.data);
        setRecordsList(records.data);
        return records.data;
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
                        <th>Name</th>
                        <th>Accuracy</th>
                        <th>WPM</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsList?.map((record, index) => {
                        return (
                            <tr>
                                <td>{record.name}</td>
                                <td>{record.accuracy}</td>
                                <td>{record.wpm}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default LeaderBoard;
