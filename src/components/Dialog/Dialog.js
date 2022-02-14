import React from "react";
import './Dialog.css';

function Dialog(props) {
    const closeBtn = (props.closeLabel) ?
        (
            <button type="button" onClick={() => {
                props.setActiveDialog(null);
            }}>{props.closeLabel}</button>
        ) : null;

    const dialogClassName = `dialog ${props.name}`;

    const userMessage = (props.userMessage) ? (
        <div className="userMessage">{props.userMessage}</div>
    ) : null;

    return (
        <div className="dialog-backdrop">
            <div className="dialog-container">
                <div className={dialogClassName}>
                    <form>
                        <h1>{props.title}</h1>
                        <div className="dialog-contents">
                            {userMessage}
                            {props.contents}
                        </div>
                        <div className="dialog-footer">
                            <div className="dialog-footer-start"></div>
                            <div className="dialog-footer-end">
                                {closeBtn}
                                <input type="submit" className="submit" onClick={e => {
                                    e.preventDefault();
                                    props.onSubmit();
                                }} value={props.submitLabel}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Dialog;