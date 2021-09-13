import React, {useRef, useState} from "react";
import './App.css';
import Toolbar from "./components/Toolbar/Toolbar";
import OpenDialog from "./components/OpenDialog/OpenDialog";
import Header from "./components/Header/Header";
import ContentEditor from "./components/ContentEditor/ContentEditor";
import {REACT_APP_API_HOSTNAME, APP_INSTANCE_ID} from "./constants";
import socket from "./Socket";
import LoginDialog from "./components/LoginDialog/LoginDialog";
import documentApi from "./apis/DocumentApi";

function App() {
    const editorRef = useRef(null);

    const [loggedIn, setLoggedIn] = useState(false);
    const authToken = useRef();
    const [loginError, setLoginError] = useState();
    const [documents, setDocuments] = useState();
    const [currentDocumentId, setCurrentDocumentId] = useState(null);
    const [currentDocumentName, setCurrentDocumentName] = useState(null);
    const [dialogs, setDialogs] = useState({
        open: {
            visible: false
        },
        login: {
            visible: true
        }
    });

    const newDocument = () => {
        setCurrentDocumentId(null);
        setCurrentDocumentName(null);

        if (editorRef.current) {
            editorRef.current.setContent("");
        }
    };

    const showOpenDialog = async () => {
        const currentDialogs = Object.assign({}, dialogs);
        currentDialogs.open.visible = true;
        setDialogs(currentDialogs);
    }

    const openDocument = () => {
        const docId = document.querySelector("input[name='documentId']:checked").value;
        setCurrentDocumentId(docId);
        const currentDocument = documents.find(d => d._id === docId);
        setCurrentDocumentName(currentDocument.name);
        editorRef.current.setContent(currentDocument.contents);

        socket.openDocument(docId);

        socket.onUpdate(data => {
            // Only update if it was somebody else, and content doesn't differ
            // to avoid excessive updates and bad UX
            if (data.by !== APP_INSTANCE_ID && editorRef.current.getContent() !== data.content) {
                editorRef.current.setContent(data.content);
            }
        });
    };

    const saveDocument = async () => {
        if (currentDocumentId) {
            await documentApi.updateDocument(currentDocumentId, currentDocumentName, editorRef.current.getContent());
        } else {
            await documentApi.createDocument(currentDocumentName, editorRef.current.getContent())
                .then(doc => setCurrentDocumentId(doc._id));
        }
    }

    const sendUpdateToBackend = () => {
        if (currentDocumentId) {
            socket.update(currentDocumentId, currentDocumentName, editorRef.current.getContent());
        }
    };

    const fetchDocuments = async () => {
        await documentApi.fetchDocuments()
            .then(d => setDocuments(d));
    }

    const loginUser = async () => {
        documentApi.loginUser(document.querySelector("#username").value, document.querySelector("#password").value)
            .then(res => {
                if (res.success) {
                    setLoggedIn(true);
                } else {
                    setLoginError("Invalid username or password.");
                    document.querySelector("#username").focus();
                }
            });
    }

    const openDialog = (dialogs.open.visible) ?
        (
            <OpenDialog
                dialogs={dialogs}
                setDialogs={setDialogs}
                onSubmit={openDocument}
                documents={documents}
                fetchDocuments={fetchDocuments}
                setDocuments={setDocuments}
            />
        ) : null;

    const app = loggedIn ?
        (
            <div>
                <Header
                    currentDocumentName={currentDocumentName}
                    setCurrentDocumentName={setCurrentDocumentName}
                />
                <Toolbar
                    currentDocumentId={currentDocumentId}
                    setCurrentDocumentId={setCurrentDocumentId}
                    dialogs={dialogs}
                    setDialogs={setDialogs}
                    editorRef={editorRef}
                    newDocument={newDocument}
                    openDocument={showOpenDialog}
                    saveDocument={saveDocument}
                />
                {openDialog}
                <ContentEditor
                    editorRef={editorRef}
                    socket={socket}
                    currentDocumentId={currentDocumentId}
                    currentDocumentName={currentDocumentName}
                    sendUpdateToBackend={sendUpdateToBackend}
                />
            </div>
        ) : (
            <LoginDialog
                onSubmit={loginUser}
                dialogs={dialogs}
                setDialogs={setDialogs}
                loginError={loginError}
            />
        );

    return (
        <div className="App">
            {app}
        </div>
    );
}

export default App;