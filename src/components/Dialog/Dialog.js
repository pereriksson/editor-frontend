import React from "react";
import './Dialog.css';

function Dialog(props) {
    const closeBtn = (props.closeLabel) ?
        (
            <button onClick={() => {
                const dialogs = Object.assign({}, props.dialogs);
                dialogs[props.name].visible = false;
                props.setDialogs(dialogs);
            }}>{props.closeLabel}</button>
        ) : null;

    const dialogClassName = `dialog ${props.name}`;

    return (
        <div className="dialog-backdrop">
            <div className="dialog-container">
                <div className={dialogClassName}>
                    <h1>{props.title}</h1>
                    <div className="dialog-contents">
                        {props.contents}
                    </div>
                    <div className="dialog-footer">
                        <div className="dialog-footer-start"></div>
                        <div className="dialog-footer-end">
                            {closeBtn}
                            <button className="submit" onClick={() => {
                                const dialogs = Object.assign({}, props.dialogs);
                                props.onSubmit();
                                dialogs[props.name].visible = false;
                                props.setDialogs(dialogs);
                            }}>{props.submitLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialog;