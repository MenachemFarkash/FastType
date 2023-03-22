import React from "react";

function LeaderBoard() {
    return (
        <div>
            <img className="logo" src="logo.png" alt="logo" />
            <h1>Record Table</h1>
            <table className="leaderBoardTable">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>accuracy</th>
                        <th>WPM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Farkash</td>
                        <td>95.5</td>
                        <td>52</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default LeaderBoard;
