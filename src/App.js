import React, {useRef, useState} from "react";
import './App.css';
import Toolbar from "./components/Toolbar/Toolbar";
import OpenDialog from "./components/OpenDialog/OpenDialog";
import Header from "./components/Header/Header";
import ContentEditor from "./components/ContentEditor/ContentEditor";
import {REACT_APP_API_HOSTNAME, APP_INSTANCE_ID} from "./constants";
import socket from "./Socket";
import LoginDialog from "./components/LoginDialog/LoginDialog";

function App() {
    const editorRef = useRef(null);

    const [loggedIn, setLoggedIn] = useState(false);
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
            await fetch(`${REACT_APP_API_HOSTNAME}/v1/documents/${currentDocumentId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: currentDocumentId,
                    name: currentDocumentName,
                    contents: editorRef.current.getContent()
                })
            });
        } else {
            // Or create
            const newDocument = await fetch(`${REACT_APP_API_HOSTNAME}/v1/documents`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: currentDocumentName,
                    contents: editorRef.current.getContent()
                })
            })
                .then(res => res.json());
            setCurrentDocumentId(newDocument._id);
        }
    }

    const sendUpdateToBackend = () => {
        if (currentDocumentId) {
            socket.update(currentDocumentId, currentDocumentName, editorRef.current.getContent());
        }
    };

    const fetchDocuments = async () => {
        const res = await fetch(`${REACT_APP_API_HOSTNAME}/v1/documents`)
            .then(res => res.json());

        setDocuments(res);
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
            <LoginDialog/>
        );

    return (
        <div className="App">
            {app}
        </div>
    );
}

export default App;