import React from "react";
import './ToolbarButton.css';

function ToolbarButton(props) {
    return (
        <div className="toolbar-button">
            <button>
                <span className="icon"><img src={props.icon}/></span>
                <span className="label">{props.label}</span>
            </button>
        </div>
    );
}

export default ToolbarButton;