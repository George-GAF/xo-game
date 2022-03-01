import React from "react";
import "../index.css";

function Square(props) {
    // assgin class name based value
    let className = `square ${props.value === "X" ? "b-palyer" : "r-palyer"}`;
    return (
        <button className={className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square