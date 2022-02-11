import React from "react";
import './Dialog.css';

function Dialog(props) {
    const closeBtn = (props.closeLabel) ?
        (
            <button onClick={() => {
                props.setActiveDialog(null);
            }}>{props.closeLabel}</button>
        ) : null;

    const dialogClassName = `dialog ${props.name}`;

    return (
        <div className="dialog-backdrop">
            <div className="dialog-container">
                <div className={dialogClassName}>
                    <form>
                        <h1>{props.title}</h1>
                        <div className="dialog-contents">
                            {props.contents}
                        </div>
                        <div className="dialog-footer">
                            <div className="dialog-footer-start"></div>
                            <div className="dialog-footer-end">
                                {closeBtn}
                                <input type="submit" className="submit" onClick={e => {
                                    e.preventDefault();
                                    props.onSubmit();
                                    props.setActiveDialog(null);
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