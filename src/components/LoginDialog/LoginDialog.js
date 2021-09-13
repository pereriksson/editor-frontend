import React, {useEffect, useState} from "react";
import Dialog from "../Dialog/Dialog";
import "./LoginDialog.css";

function LoginDialog (props) {
    useEffect(() => {
        document.querySelector("#username").focus();
    }, []);

    const contents = (
        <div class="loginForm">
            <p>
                Logga in med någon av:<br/>
                <ul>
                    <li>admin/admin</li>
                    <li>per/password</li>
                    <li>emil/password</li>
                </ul>
            </p>
            <div class="loginFormRow">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username"/>
            </div>
            <div class="loginFormRow">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password"/>
            </div>
        </div>
    );
    return (
        <Dialog
            title="Login"
            name="login"
            submitLabel="Login"
            dialogs={props.dialogs}
            setDialogs={props.setDialogs}
            contents={contents}
            onSubmit={props.onSubmit}
        />
    );
}

export default LoginDialog;