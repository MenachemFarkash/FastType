import "../App.css";
import { useState, useRef, useEffect } from "react";
import { mostCommonWords } from "../Words/english";
import { FaRedo, FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import logo from "../../public/logo.png";

function App() {
    const navigate = useNavigate();
    const phrases = [
        "the quick brown fox jumps over the lazy dog",
        "a stitch in time saves nine",
        "all's fair in love and war",
    ];
    const [wordCount, setWordCount] = useState(10);
    const [currentPhrase, setCurrentPhrase] = useState(() => createPhrase());
    const [currentChar, setCurrentChar] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [wordsPerMinute, setWordsPerMinute] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [letters, setLetters] = useState([]);
    const [activeChar, setActiveChar] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const elementPocus = useRef(null);

    useEffect(() => {
        restart();
    }, [wordCount]);

    function handleKeyDown(event) {
        setIsPlaying(true);
        if (event.key === "Tab" || event.key === "Shift") {
        } else {
            if (isPlaying === true) {
                if (event.key === "Backspace") {
                    setCurrentChar(currentChar - 1);
                    letters.splice(-1);
                    setActiveChar(activeChar - 1);
                } else if (event.key === " ") {
                    document.getElementById("mainInput").value = "";
                    letters.push(event.key);
                    setCurrentChar(currentChar + 1);
                    setActiveChar(activeChar + 1);
                } else {
                    if (currentChar === 0) {
                        setStartTime(Date.now());
                    }
                    try {
                        console.log(document.getElementById("progress"));
                    } catch (error) {}
                    // Check if the char is correct or not
                    if (event.key === currentPhrase[currentChar]) {
                        setCorrectChars(correctChars + 1);
                    } else {
                        setIncorrectChars(incorrectChars + 1);
                    }
                    letters.push(event.key);
                    setCurrentChar(currentChar + 1);
                    setActiveChar(activeChar + 1);

                    // check if ended typing
                    if (currentChar === currentPhrase.length - 2) {
                        const timeTaken = (Date.now() - startTime) / 1000;
                        setIsPlaying(false);

                        setEndTime((prevNumber) => {
                            const newNumber = prevNumber + Date.now();
                            return newNumber;
                        });
                        endGame(timeTaken, endTime);
                    }
                }
            }
        }
    }

    function getRandomWords() {
        const selectedWords = [];
        while (selectedWords.length < wordCount) {
            const randomIndex = Math.floor(Math.random() * mostCommonWords.length);
            const randomWord = mostCommonWords[randomIndex];
            if (!selectedWords.includes(randomWord)) {
                selectedWords.push(randomWord);
            }
        }

        return selectedWords;
    }

    function createPhrase() {
        const selectedWords = getRandomWords();

        const selectedWordsString = selectedWords
            .map((word) => word + " ")
            .join("")
            .split("");
        return selectedWordsString;
    }

    function getAccuracy() {
        const totalChars = correctChars + incorrectChars;
        if (totalChars === 0) {
            return 0;
        }
        setAccuracy(Math.round((correctChars / totalChars) * 100));
        return Math.round((correctChars / totalChars) * 100);
    }

    function endGame(time) {
        getAccuracy();
        const WPM = ((letters.length / 5 / time) * 60).toFixed(2);
        setWordsPerMinute(WPM);
        localStorage.setItem("wordCount", wordCount);
        setIsPlaying(false);
        try {
            if (WPM > localStorage.getItem("record") && localStorage.getItem("wordCount") == wordCount) {
                localStorage.setItem("record", WPM);
                console.log("new record");
                //check if there is a username like the current local storage one
            } else if (localStorage.getItem("wordCount") != wordCount) {
                localStorage.setItem("record", WPM);
                console.log("new word count");
            } else {
            }
        } catch (error) {}
    }

    const restart = () => {
        setCurrentPhrase(createPhrase());
        setActiveChar(0);
        setCorrectChars(0);
        setIncorrectChars(0);
        setStartTime(null);
        setEndTime(0);
        setWordsPerMinute(0);
        setCurrentChar(0);
        setLetters([]);
        setIsPlaying(true);
        try {
            document.getElementById("mainInput").value = "";
            elementPocus.current.focus();
        } catch (error) {}
    };

    return (
        <div className="App">
            <header className="App-header">
                <img className="logo" src="logo.png" />
                <h2>
                    Hi <span className="userNameHeader">{localStorage.getItem("name")}</span>, good luck
                </h2>
                {isPlaying === true ? (
                    <>
                        <div
                            className="progress"
                            style={{ width: (letters.length / currentPhrase.length) * 100 + "vw" }}
                            id="progress"
                        ></div>
                        <h2 className="mainText">
                            {currentPhrase.map((letter, index) => {
                                return (
                                    <>
                                        <span
                                            key={index}
                                            style={
                                                letters[index] === currentPhrase[index]
                                                    ? styles.correct
                                                    : letters[index] &&
                                                      letters[index] !== currentPhrase[index]
                                                    ? styles.incorrect
                                                    : index === activeChar
                                                    ? styles.active
                                                    : styles.default
                                            }
                                            className={index === activeChar ? "active" : ""}
                                        >
                                            {letter}
                                        </span>
                                    </>
                                );
                            })}
                        </h2>
                        <input
                            ref={elementPocus}
                            tabIndex={1}
                            autoFocus
                            onKeyDown={(event) => handleKeyDown(event)}
                            id="mainInput"
                            type="text"
                            className="mainInput"
                            placeholder="Type Here"
                        />
                        <div
                            className="restartButton"
                            tabIndex={2}
                            onKeyDown={() => restart()}
                            onClick={() => restart()}
                        >
                            <FaRedo />
                            <p>restart</p>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="accuracyTitle">
                            Accuracy: <span className="accuracy">{accuracy}</span>%
                        </h2>
                        <br />
                        <h2 className="wpmTitle">
                            WPM: <span className="wpm">{wordsPerMinute}</span>
                        </h2>
                        <div
                            className="restartButton"
                            tabIndex={2}
                            onKeyDown={() => restart()}
                            onClick={() => restart()}
                        >
                            <FaRedo />
                            <p>restart</p>
                        </div>
                    </>
                )}

                {/* {endTime > 0 && (
                    <>
                        <h2 className="accuracyTitle">
                            Accuracy: <span className="accuracy">{accuracy}</span>%
                        </h2>
                        <br />
                        <h2 className="wpmTitle">
                            WPM: <span className="wpm">{wordsPerMinute}</span>
                        </h2>
                    </>
                )} */}
                <div className="actionButtons">
                    <div className="restartButton">
                        <FaCrown tabIndex={3} onClick={() => navigate("/leaderBoard")} />
                        <p>
                            Leader <br /> Board
                        </p>
                    </div>
                    <div className="wordCountContainer">
                        <p>Word Count</p>
                        <div className="wordCountButtons">
                            <button
                                type="text"
                                onClick={() => {
                                    setWordCount(10);
                                }}
                            >
                                10
                            </button>
                            <button
                                type="text"
                                onClick={(ev) => {
                                    setWordCount(15);
                                }}
                            >
                                15
                            </button>
                            <button
                                type="text"
                                onClick={(ev) => {
                                    setWordCount(20);
                                }}
                            >
                                20
                            </button>
                            <button
                                type="text"
                                onClick={(ev) => {
                                    setWordCount(30);
                                }}
                            >
                                30
                            </button>
                        </div>
                    </div>
                </div>
                {/* <footer className="footer">
                    <h3>Choose Word Count</h3>
                    <div className="wordCountButtons">
                        <button
                            type="text"
                            onClick={() => {
                                setWordCount(10);
                            }}
                        >
                            10
                        </button>
                        <button
                            type="text"
                            onClick={(ev) => {
                                setWordCount(15);
                            }}
                        >
                            15
                        </button>
                        <button
                            type="text"
                            onClick={(ev) => {
                                setWordCount(20);
                            }}
                        >
                            20
                        </button>
                        <button
                            type="text"
                            onClick={(ev) => {
                                setWordCount(30);
                            }}
                        >
                            30
                        </button>
                    </div>
                </footer> */}
            </header>
        </div>
    );
}

const styles = {
    correct: {
        color: "green",
    },
    incorrect: {
        backgroundColor: "red",
    },
    active: {
        textDecoration: "underline",
    },
    default: {},
};

export default App;
