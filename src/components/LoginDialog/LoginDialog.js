import React, {useEffect} from "react";
import Dialog from "../Dialog/Dialog";
import "./LoginDialog.css";

function LoginDialog (props) {
    useEffect(() => {
        document.querySelector("#username").focus();
    }, []);

    const loginError = props.loginError ? (
        <p className="loginError">{props.loginError}</p>
    ) : null;

    const contents = (
        <div className="loginForm">
            {loginError}
            <p>
                Log in with one of the following:
            </p>
            <ul>
                <li>admin/admin</li>
                <li>per/password</li>
                <li>emil/password</li>
            </ul>
            <div className="loginFormRow">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username"/>
            </div>
            <div className="loginFormRow">
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