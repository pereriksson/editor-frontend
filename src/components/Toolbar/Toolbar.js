import React from "react";
import ToolbarButtonGroup from "../ToolbarButtonGroup/ToolbarButtonGroup";
import ToolbarButton from "../ToolbarButton/ToolbarButton";
import './Toolbar.css';
import newIcon from './new.svg';
import openIcon from './open.svg';
import saveIcon from './save.svg';

function Toolbar(props) {
    return (
        <div className="toolbar">
            <ToolbarButtonGroup>
                <ToolbarButton
                    icon={newIcon}
                    label="New"
                    onClick={props.newDocument}
                />
                <ToolbarButton
                    icon={openIcon}
                    label="Open"
                    onClick={props.openDocument}
                />
                <ToolbarButton
                    icon={saveIcon}
                    label="Save"
                    onClick={props.saveDocument}
                />
            </ToolbarButtonGroup>
        </div>
    );
}

export default Toolbar;