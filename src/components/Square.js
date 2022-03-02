import React from "react";
import "../index.css";

function Square(props) {
    // assgin class name based value
    let className = `square ${props.value === "X" ? "first-player" : "second-player"}`;
    return (
        <button className={className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square