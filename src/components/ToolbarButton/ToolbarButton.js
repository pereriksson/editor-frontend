import React from "react";
import './ToolbarButton.css';

function ToolbarButton(props) {
    return (
        <div className="toolbar-button">
            <button
                onClick={() => {
                    const state = Object.assign({}, props.state);
                    state.dialogs.open.visible = true;
                    props.setState(state);
                }}
            >
                <span className="icon"><img alt={props.label} src={props.icon}/></span>
                <span className="label">{props.label}</span>
            </button>
        </div>
    );
}

export default ToolbarButton;