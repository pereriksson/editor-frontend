import React from "react";
import ToolbarButtonGroup from "../ToolbarButtonGroup/ToolbarButtonGroup";
import ToolbarButton from "../ToolbarButton/ToolbarButton";
import './Toolbar.css';
import newIcon from './new.svg';
import openIcon from './open.svg';
import saveIcon from './save.svg';
import exportIcon from './export.png';
import commentIcon from './comment.svg';

function Toolbar(props) {
    const commentsLabel = (props.view === "editor") ?
        "Show comments" : "Hide comments";

    return (
        <div className="toolbar">
            <ToolbarButtonGroup>
                <ToolbarButton
                    icon={newIcon}
                    label="New"
                    name="new"
                    onClick={props.newDocument}
                />
                <ToolbarButton
                    icon={openIcon}
                    label="Open"
                    name="open"
                    onClick={props.openDocument}
                />
                <ToolbarButton
                    icon={saveIcon}
                    label="Save"
                    name="save"
                    onClick={props.saveDocument}
                />
                <ToolbarButton
                    icon={exportIcon}
                    label="Export to PDF"
                    name="export"
                    onClick={props.exportDocument}
                />
            </ToolbarButtonGroup>
            <ToolbarButtonGroup>
                <ToolbarButton
                    icon={commentIcon}
                    label={commentsLabel}
                    name="comments"
                    onClick={props.toggleCommentsView}
                />
            </ToolbarButtonGroup>
        </div>
    );
}

export default Toolbar;