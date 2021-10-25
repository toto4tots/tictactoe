import React, { useState, useEffect } from "react";

const FIRST_MESSAGE = "You can go first";

export const Game = () => {
    const reset = () => {
        // reset the backend
        fetch("http://localhost:5000/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors"
        })
    }

    useEffect(() => {
        reset();
    }, [])

    const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]); 
    const [gameFinished, setGameFinished] = useState(false);
    const [message, setMessage] = useState(FIRST_MESSAGE);
    const [resetMessage, setResetMessage] = useState("");

    const handleClick = (e) => {
        const strIndex = e.target.getAttribute('name');
        const index = [+strIndex.charAt(0), +strIndex.charAt(1)];
        updateBoard(index); 
    }

    const handleReset = () => {
        setResetMessage("Starting over...");
        setTimeout(() => { globalReset() }, 3000);
    }

    const globalReset = () => {
        reset();
        setBoard([[null, null, null], [null, null, null], [null, null, null]]);
        setGameFinished(false);
        setMessage(FIRST_MESSAGE);
        setResetMessage("");
    }

    const updateBoard = (index) => {
        if (!gameFinished) {
            setMessage("");
            fetch("http://localhost:5000/board", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "move": index
                }),
                mode: "cors"
            })
                .then(response => response.json())
                .then(response => {
                    const [i, j] = index;
                    let temp = board.map(a => { return { ...a } });
                    if (temp[i][j] === null) {
                        temp[i][j] = "X";
                        let player2 = response["player2"]
                        if (player2) {
                            temp[player2[0]][player2[1]] = "O";
                        }
                    }
                    setBoard(temp);
                    if (response["gameFinished"]) {
                        setGameFinished(response["gameFinished"]);
                        if ("message" in response) {
                            setMessage(response["message"]);
                        }
                        handleReset();
                    }
                })
                .catch((e) => {
                    console.error(e)
                })
        }
    }

    let rows = [
        [
            <td name="00" key="00" onClick={handleClick}>{board[0][0]}</td>,
            <td name="01" key="01" onClick={handleClick}>{board[0][1]}</td>,
            <td name="02" key="02" onClick={handleClick}>{board[0][2]}</td>,
        ],
        [
            <td name="10" key="10" onClick={handleClick}>{board[1][0]}</td>,
            <td name="11" key="11" onClick={handleClick}>{board[1][1]}</td>,
            <td name="12" key="12" onClick={handleClick}>{board[1][2]}</td>,
        ],
        [
            <td name="20" key="20" onClick={handleClick}>{board[2][0]}</td>,
            <td name="21" key="21" onClick={handleClick}>{board[2][1]}</td>,
            <td name="22" key="22" onClick={handleClick}>{board[2][2]}</td>,
        ],
    ]

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        {rows[0]}
                    </tr>
                    <tr>
                        {rows[1]}
                    </tr>
                    <tr>
                        {rows[2]}
                    </tr>
                </tbody>
            </table>
            {message}
            <div>
                {resetMessage}
            </div>
        </div>
    )
}