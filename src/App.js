import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { mostCommonWords } from "./Words/english";

function App() {
    const phrases = [
        "the quick brown fox jumps over the lazy dog",
        "a stitch in time saves nine",
        "all's fair in love and war",
    ];

    const [wordCount, setWordCount] = useState(20);
    const [currentPhrase, setCurrentPhrase] = useState(() => createPhrase());
    const [currentChar, setCurrentChar] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [wordsPerMinute, setWordsPerMinute] = useState(0);
    const [letters, setLetters] = useState([]);
    const [activeChar, setActiveChar] = useState(0);

    function handleKeyDown(event) {
        if (event.key === "Backspace") {
            setCurrentChar(currentChar - 1);
            letters.splice(-1);
            console.log(letters);
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
            // Check if the char is correct or not
            if (event.key === currentPhrase[currentChar]) {
                setCorrectChars(correctChars + 1);
            } else {
                // setIncorrectChars(incorrectChars + 1);
                setIncorrectChars(incorrectChars + 1);
            }
            letters.push(event.key);
            console.log(letters);
            setCurrentChar(currentChar + 1);
            setActiveChar(activeChar + 1);

            // check if ended typing
            if (currentChar === currentPhrase.length - 2) {
                const timeTaken = (Date.now() - startTime) / 1000;

                setEndTime((prevNumber) => {
                    const newNumber = prevNumber + Date.now();
                    console.log(newNumber);
                    return newNumber;
                });

                endGame(timeTaken, endTime);
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
        console.log(selectedWordsString);
        return selectedWordsString;
    }

    function getAccuracy() {
        const totalChars = correctChars + incorrectChars;
        if (totalChars === 0) {
            return 0;
        }
        console.log(Math.round((correctChars / totalChars) * 100) + "%");
        return Math.round((correctChars / totalChars) * 100);
    }

    function endGame(time) {
        console.table(time);
        getAccuracy();
        console.log("correctChars: ", correctChars);
        console.log("incorrectChars: ", incorrectChars);
        console.log("endTime: ", endTime);
        const totalTypedWords = currentPhrase.join("").split(" ").length;
        setWordsPerMinute(((totalTypedWords / time) * 60).toFixed(2));
    }

    return (
        <div className="App">
            <header className="App-header">
                <h2 className="mainText">
                    {currentPhrase.map((letter, index) => {
                        return (
                            <>
                                <span
                                    key={index}
                                    style={
                                        letters[index] === currentPhrase[index]
                                            ? styles.correct
                                            : letters[index] && letters[index] !== currentPhrase[index]
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
                    autoFocus
                    onKeyDown={(event) => handleKeyDown(event)}
                    id="mainInput"
                    type="text"
                    className="mainInput"
                    placeholder="Type Here"
                />
                {endTime > 0 && (
                    <>
                        <h2 className="accuracyTitle">
                            Accuracy: <span className="accuracy">{getAccuracy()}</span>%
                        </h2>
                        <br />
                        <h2 className="wpmTitle">
                            WPM: <span className="wpm">{wordsPerMinute}</span>
                        </h2>
                    </>
                )}
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
