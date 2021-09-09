import React from "react";
import './ToolbarButton.css';

function ToolbarButton(props) {
    return (
        <div className="toolbar-button">
            <button
                onClick={props.onClick}
            >
                <span className="icon"><img alt={props.label} src={props.icon}/></span>
                <span className="label">{props.label}</span>
            </button>
        </div>
    );
}

export default ToolbarButton;