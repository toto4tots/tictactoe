import React from "react";

export const Header = () => {
    return (
        <div className="game-text">
            <div className="title"><strong>Tic-Tac-Toe</strong> </div>
            <div className="player-marks">
                X: Human <br />
                O: Computer <br />
            </div>
            <div>Human goes first</div>
        </div>
    )
}
