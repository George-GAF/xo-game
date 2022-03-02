import React, { useState } from "react";
import "../index.css";
import Square from "./Square";
//create app
function App(props) {
    // create game state
    const [state, setState] = useState({
        // game history as array in first turn
        history: [
            {
                squares: Array(9).fill(null),
            },
        ],
        // count game step
        stepNumber: 0,
        xIsNext: true,
    })

    const history = state.history;
    const current = history[state.stepNumber];

    let status;

    // function handle click in squer
    function handleClick(i) {
        // part handle history 
        const history = state.history.slice(0, state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // check if player win 
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // assgin palyer value
        squares[i] = state.xIsNext ? "X" : "O";
        // update state - add array to history 
        setState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            stepNumber: history.length,
            // reverse turn 
            xIsNext: !state.xIsNext,
        });
    }
    // move between steps history
    function jumpTo(step) {
        setState(prev => ({
            ...prev,
            stepNumber: step,
            xIsNext: step % 2 === 0,
        }));
    }
    // create list of movies
    const moves = history.map((step, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return (
            <li className="steps" key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });
    // check winner and write in top of step divs
    const winner = calculateWinner(current.squares);
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (state.xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            <div className="board">
                {
                    Array(9).fill(null).map((square, index) =>
                        <Square
                            key={index}
                            value={current.squares[index]}
                            onClick={() => handleClick(index)}//send function to square components 
                        />
                    )
                }
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                <ul>{moves}</ul>
            </div>

        </div>
    );

}

export default App

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}