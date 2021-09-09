import React from "react";
import './Dialog.css';

function Dialog(props) {
    return (
        <div className="dialog-backdrop">
            <div className="dialog-container">
                <div className="dialog">
                    <h1>{props.title}</h1>
                    <div className="dialog-footer">
                        <div className="dialog-footer-start"></div>
                        <div className="dialog-footer-end">
                            <button onClick={() => {
                                const state = Object.assign({}, props.state);
                                state.dialogs[props.name].visible = false;
                                props.setState(state);
                            }}>{props.closeLabel}</button>
                            <button className="submit" onClick={() => {

                            }}>{props.submitLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialog;