import React from "react";
import Dialog from "../Dialog/Dialog";
import "./RegisterDialog.css";

function RegisterDialog (props) {
    let contents;

    const showLoginDialog = () => {
        props.setActiveDialog("login");
    }

    contents = (
        <div>
            <p>Already have an account? <button type="button" className="link" onClick={showLoginDialog}>Click here to login</button></p>
            <p>Please fill in the following:</p>
            <div className="formRow">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username"/>
            </div>
            <div className="formRow">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password"/>
            </div>
        </div>
    );

    return (
        <Dialog
            title="Register an account"
            name="register"
            submitLabel="Register"
            setActiveDialog={props.setActiveDialog}
            contents={contents}
            onSubmit={props.onSubmit}
            userMessage={props.userMessage}
        />
    );
}

export default RegisterDialog;