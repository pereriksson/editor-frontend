import React, {useState, createRef} from "react";
import Dialog from "../Dialog/Dialog";
import "./AcceptInvitationDialog.css";
import {Navigate, useParams} from "react-router-dom";

function AcceptInvitationDialog (props) {
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();

    const username = createRef();
    const password = createRef();
    const firstName = createRef();
    const lastName = createRef();

    let contents;

    contents = (
        <div>
            <p>Please fill in the form below to create an account.</p>
            <div className="formRow">
                <label htmlFor="username">Username:</label>
                <input ref={username} type="text" id="username"/>
            </div>
            <div className="formRow">
                <label htmlFor="password">Password:</label>
                <input ref={password} type="password" id="password"/>
            </div>
            <div className="formRow">
                <label htmlFor="firstName">First name:</label>
                <input ref={firstName} type="text" id="firstName"/>
            </div>
            <div className="formRow">
                <label htmlFor="lastName">Last name:</label>
                <input ref={lastName} type="text" id="lastName"/>
            </div>
        </div>
    );

    const acceptInvitation = async () => {
        await props.onSubmit(
            id,
            username.current.value,
            password.current.value,
            firstName.current.value,
            lastName.current.value
        );
        setRedirect(true);
    }

    return !redirect ? (
        <Dialog
            title="Accept invitation"
            name="invite"
            submitLabel="Register"
            setActiveDialog={props.setActiveDialog}
            contents={contents}
            onSubmit={acceptInvitation}
            userMessage={props.userMessage}
            closeLabel="Close"
        />
    ) : (
        <Navigate to="/"/>
    );
}

export default AcceptInvitationDialog;