import React, { useState, useEffect } from "react";

export const Game = () => {
    const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]) 
    let rows = [
        [
            <td name="00" key="00">{board[0][0]}</td>,
            <td name="01" key="01">{board[0][1]}</td>,
            <td name="02" key="02">{board[0][2]}</td>,
        ],
        [
            <td name="10" key="10">{board[1][0]}</td>,
            <td name="11" key="11">{board[1][1]}</td>,
            <td name="12" key="12">{board[1][2]}</td>,
        ],
        [
            <td name="20" key="20">{board[2][0]}</td>,
            <td name="21" key="21">{board[2][1]}</td>,
            <td name="22" key="22">{board[2][2]}</td>,
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