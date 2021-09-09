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
                    state={props.state}
                    setState={props.setState}
                    onClick={() => {
                        const state = Object.assign({}, props.state);
                        state.currentDocumentId = null;
                        props.editorRef.current.setContent("");
                    }}
                />
                <ToolbarButton
                    icon={openIcon}
                    label="Open"
                    state={props.state}
                    setState={props.setState}
                    onClick={() => {
                        const state = Object.assign({}, props.state);
                        state.dialogs.open.visible = true;
                        props.setState(state);
                    }}
                />
                <ToolbarButton
                    icon={saveIcon}
                    label="Save"
                    state={props.state}
                    setState={props.setState}
                />
            </ToolbarButtonGroup>
        </div>
    );
}

export default Toolbar;