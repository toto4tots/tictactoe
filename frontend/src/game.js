import React, { useState, useEffect } from "react";

export const Game = () => {
    useEffect(() => {
        fetch("http://localhost:5000/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            mode: "cors"
        })
    }, [])
    const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]) 

    const handleClick = (e) => {
        const strIndex = e.target.getAttribute('name');
        const index = [+strIndex.charAt(0), +strIndex.charAt(1)]        
        updateBoard(index)
    }

    const updateBoard = ([i, j]) => {
        let temp = board.map(a => { return { ...a } });
        if (temp[i][j] === null) {
            temp[i][j] = "X";
        }
    
        setBoard(temp) 
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
        </div>
    )
}