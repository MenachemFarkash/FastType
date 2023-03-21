import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./Components/Game";
import LeaderBoard from "./Components/LeaderBoard";
import LoginPage from "./Components/LoginPage";

function App() {
    return (
        <div>
            <header className="App-header">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/leaderboard" element={<LeaderBoard />} />
                </Routes>
            </header>
        </div>
    );
}

export default App;
