import React from "react";
import './ToolbarButtonGroup.css';

function ToolbarButtonGroup(props) {
    return (
        <div class="toolbar-button-group">
            {props.children}
        </div>
    )
}

export default ToolbarButtonGroup;