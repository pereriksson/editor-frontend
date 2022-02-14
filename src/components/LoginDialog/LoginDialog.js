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

    const showRegisterDialog = () => {
        props.setActiveDialog("register");
    }

    const contents = (
        <div className="loginForm">
            {loginError}
            <p>
                Don't have an account yet? <button type="button" className="link" onClick={showRegisterDialog}>Create one now</button>
            </p>
            <p>
                Log in with one of the following:
            </p>
            <ul>
                <li>per/password</li>
                <li>emil/password</li>
            </ul>
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
            title="Login"
            name="login"
            submitLabel="Login"
            setActiveDialog={props.setActiveDialog}
            contents={contents}
            onSubmit={props.onSubmit}
        />
    );
}

export default LoginDialog;