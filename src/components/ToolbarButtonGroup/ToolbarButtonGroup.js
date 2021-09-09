import React from "react";
import './ToolbarButtonGroup.css';

function ToolbarButtonGroup(props) {
    return (
        <div className="toolbar-button-group">
            {props.children}
        </div>
    )
}

export default ToolbarButtonGroup;