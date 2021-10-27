import React, { useState, useEffect } from "react";

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
    const [tempBoard, setTempBoard] = useState(null); 
    const [responseData, setResponseData] = useState(null);
    const [message, setMessage] = useState("");
    const [currentPlayer, setCurrentPlayer] = useState(1);

    useEffect(() => {
        const globalReset = () => {
            reset()
            setBoard([[null, null, null], [null, null, null], [null, null, null]])
            setTempBoard(null);
            setResponseData(null);
            setMessage("");
            setCurrentPlayer(1);
        };

        const gameOver = () => {
            alert(responseData["message"]);
            setMessage("Starting Over...");
            setCurrentPlayer(null);
            setTimeout(() => { globalReset() }, 3000)  
        };

        if (tempBoard && responseData && "player2" in responseData) {
            if (responseData["player2"] != null) {
                setCurrentPlayer(2);
                // mark the "O" 
                setTimeout(() => {
                    let copy = tempBoard.map(a => { return { ...a } });
                    const [x, y] = responseData["player2"];
                    copy[x][y] = "O";
                    setBoard(copy);
                    if (!responseData["gameFinished"]) {
                        setCurrentPlayer(1);
                    } else {
                        gameOver();
                    }               
                }, 300);
            } else if (responseData["gameFinished"]) {
                gameOver();
            } 
        }
    }, [responseData, tempBoard]);

    const updateBoard = (index) => {
        setResponseData(null);
        if (currentPlayer === 1) {
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
                    if (response["success"]) {
                        const [i, j] = index;
                        let temp = board.map(a => { return { ...a } });
                        if (temp[i][j] === null) {
                            temp[i][j] = "X";
                            setTempBoard(temp);
                        };
                        setBoard(temp);
                        setResponseData(response);
                    }
                })
                .catch((e) => {
                    console.error(e);
                })
        }
    }    

    const handleClick = (e) => {
        const strIndex = e.target.getAttribute('name');
        const index = [+strIndex.charAt(0), +strIndex.charAt(1)];
        updateBoard(index);
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
            <div className="game-text">
                {message}
            </div>
        </div>
    )
}