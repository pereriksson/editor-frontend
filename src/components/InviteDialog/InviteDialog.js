import React from "react";
import Dialog from "../Dialog/Dialog";
import "./InviteDialog.css";

function InviteDialog (props) {
    let contents;

    contents = (
        <div>
            <p>Fill in the form below to collaborate with someone.</p>
            <div className="formRow">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email"/>
            </div>
        </div>
    );

    return (
        <Dialog
            title="Invite"
            name="invite"
            submitLabel="Invite"
            setActiveDialog={props.setActiveDialog}
            contents={contents}
            onSubmit={props.onSubmit}
            userMessage={props.userMessage}
            closeLabel="Close"
        />
    );
}

export default InviteDialog;