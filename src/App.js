import React, {useRef, useState} from "react";
import './App.css';
import Toolbar from "./components/Toolbar/Toolbar";
import OpenDialog from "./components/OpenDialog/OpenDialog";
import Header from "./components/Header/Header";
import ContentEditor from "./components/ContentEditor/ContentEditor";
import {APP_INSTANCE_ID} from "./constants";
import socket from "./Socket";
import LoginDialog from "./components/LoginDialog/LoginDialog";
import documentApi from "./apis/DocumentApi";
import PdfApi from "./apis/PdfApi";
import RegisterDialog from "./components/RegisterDialog/RegisterDialog";
import InviteDialog from "./components/InviteDialog/InviteDialog";
import Comments from "./components/Comments/Comments";

function App() {
    const editorRef = useRef(null);

    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState();
    const [documents, setDocuments] = useState();
    const [currentDocumentId, setCurrentDocumentId] = useState(null);
    const [currentDocumentName, setCurrentDocumentName] = useState(null);
    const [currentDocumentComments, setCurrentDocumentComments] = useState([]);
    const currentDocumentContents = useRef("");
    const [activeDialog, setActiveDialog] = useState("login");
    const [userMessage, setUserMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState("editor");

    const newDocument = () => {
        setCurrentDocumentId(null);
        setCurrentDocumentName(null);

        if (editorRef.current) {
            editorRef.current.setContent("");
        }
    };

    const showOpenDialog = async () => {
        setActiveDialog("open");
    }

    const openDocument = () => {
        const docId = document.querySelector("input[name='documentId']:checked").value;
        setCurrentDocumentId(docId);
        const currentDocument = documents.find(d => d._id === docId);
        setCurrentDocumentName(currentDocument.name);
        setCurrentDocumentComments(currentDocument.comments);
        currentDocumentContents.current = currentDocument.contents;
        editorRef.current.setContent(currentDocument.contents);
        setActiveDialog(null);

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
            await documentApi.updateDocument(currentDocumentId, currentDocumentName, currentDocumentContents.current, currentDocumentComments);
        } else {
            await documentApi.createDocument(currentDocumentName, currentDocumentContents.current, currentDocumentComments)
                .then(doc => setCurrentDocumentId(doc._id));
        }
        setActiveDialog(null);
    }

    const sendUpdateToBackend = () => {
        currentDocumentContents.current = editorRef.current.getContent();
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

    const registerUser = async () => {
        documentApi.registerUser(document.querySelector("#username").value, document.querySelector("#password").value)
            .then(res => {
                if (res._id) {
                    setActiveDialog("login");
                    setUserMessage(null);
                } else {
                    setUserMessage(res.error)
                }
            })
    }

    const inviteUser = async () => {
        await documentApi.inviteUser(
            document.querySelector("#email").value,
            currentDocumentId
        );
        setActiveDialog(null);
    }

    const exportDocument = () => {
        const pdf = new PdfApi();
        pdf.exportPdf();
    }

    const toggleCommentsView = () => {
        if (view === "editor") {
            setView("comments");
        } else {
            setView("editor");
        }
    }

    const openDialog = (activeDialog === "open") ?
        (
            <OpenDialog
                setActiveDialog={setActiveDialog}
                onSubmit={openDocument}
                documents={documents}
                fetchDocuments={fetchDocuments}
                setDocuments={setDocuments}
                loading={loading}
                setLoading={setLoading}
            />
        ) : null;

    const registerDialog = (activeDialog === "register") ?
        (
            <RegisterDialog
                setActiveDialog={setActiveDialog}
                onSubmit={registerUser}
                userMessage={userMessage}
            />
        ) : null;

    const loginDialog = (activeDialog === "login") ?
        (
            <LoginDialog
                onSubmit={loginUser}
                setActiveDialog={setActiveDialog}
                loginError={loginError}
            />
        ) : null;

    const inviteDialog = (activeDialog === "invite") ?
        (
            <InviteDialog
                onSubmit={inviteUser}
                setActiveDialog={setActiveDialog}
            />
        ) : null;

    const currentView = (view === "editor") ? (
        <ContentEditor
            editorRef={editorRef}
            socket={socket}
            currentDocumentId={currentDocumentId}
            currentDocumentName={currentDocumentName}
            sendUpdateToBackend={sendUpdateToBackend}
            contents={currentDocumentContents.current}
        />
    ) : (
        <Comments
            contents={currentDocumentContents.current}
            currentDocumentComments={currentDocumentComments}
            setCurrentDocumentComments={setCurrentDocumentComments}
        />
    );

    const app = loggedIn ?
        (
            <div className="wrapper">
                <Header
                    currentDocumentId={currentDocumentId}
                    currentDocumentName={currentDocumentName}
                    setCurrentDocumentName={setCurrentDocumentName}
                    setActiveDialog={setActiveDialog}
                />
                <Toolbar
                    currentDocumentId={currentDocumentId}
                    setCurrentDocumentId={setCurrentDocumentId}
                    editorRef={editorRef}
                    view={view}
                    newDocument={newDocument}
                    openDocument={showOpenDialog}
                    saveDocument={saveDocument}
                    exportDocument={exportDocument}
                    toggleCommentsView={toggleCommentsView}
                />
                <div className="current-view">
                    {currentView}
                </div>
                {openDialog}
                {inviteDialog}
            </div>
        ) : (
            <div>
                {loginDialog}
                {registerDialog}
            </div>
        );

    return (
        <div className="App">
            {app}
        </div>
    );
}

export default App;