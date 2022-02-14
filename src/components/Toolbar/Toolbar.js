import React from "react";
import ToolbarButtonGroup from "../ToolbarButtonGroup/ToolbarButtonGroup";
import ToolbarButton from "../ToolbarButton/ToolbarButton";
import './Toolbar.css';
import newIcon from './new.svg';
import openIcon from './open.svg';
import saveIcon from './save.svg';
import exportIcon from './export.png';
import commentIcon from './comment.svg';
import codeIcon from './code.svg';
import terminalIcon from './terminal.svg';
import documentIcon from './document.svg';

function Toolbar(props) {
    const commentsLabel = (props.view === "editor") ?
        "Show comments" : "Hide comments";
    let comments = ["editor", "comments"].includes(props.view) ? (
        <ToolbarButtonGroup>
            <ToolbarButton
                icon={commentIcon}
                label={commentsLabel}
                name="comments"
                onClick={props.toggleCommentsView}
            />
        </ToolbarButtonGroup>
    ) : null;

    if (props.view === "code") {
        // TODO: show document button
    }

    const code = ["editor", "comments"].includes(props.view) ? (
        <ToolbarButtonGroup>
            <ToolbarButton
                icon={codeIcon}
                label="Switch to code view"
                name="code"
                onClick={props.toggleCodeView}
            />
        </ToolbarButtonGroup>
    ) : (
        <ToolbarButtonGroup>
            <ToolbarButton
                icon={documentIcon}
                label="Switch to document view"
                name="editor"
                onClick={props.toggleCodeView}
            />
        </ToolbarButtonGroup>
    );

    const runCode = props.view === "code" ? (
        <ToolbarButtonGroup>
            <ToolbarButton
                icon={terminalIcon}
                label="Run"
                name="runCode"
                onClick={props.runCode}
            />
        </ToolbarButtonGroup>
    ) : null;

    const exportToPdf = ["editor", "comments"].includes(props.view) ? (
        <ToolbarButtonGroup>
            <ToolbarButton
                icon={exportIcon}
                label="Export to PDF"
                name="export"
                onClick={props.exportDocument}
            />
        </ToolbarButtonGroup>
    ) : null;

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

            </ToolbarButtonGroup>
            {exportToPdf}
            {comments}
            {code}
            {runCode}
        </div>
    );
}

export default Toolbar;