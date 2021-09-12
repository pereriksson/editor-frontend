import React, {useEffect, useRef, useState} from "react";
import './App.css';
import Toolbar from "./components/Toolbar/Toolbar";
import OpenDialog from "./components/OpenDialog/OpenDialog";
import Header from "./components/Header/Header";
import ContentEditor from "./components/ContentEditor/ContentEditor";
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import {REACT_APP_API_HOSTNAME} from "./constants";

function App() {
    const editorRef = useRef(null);
    const [appInstanceId, setAppInstanceId] = useState(uuidv4());

    const [documents, setDocuments] = useState();
    const [currentDocumentId, setCurrentDocumentId] = useState(null);
    const [currentDocumentName, setCurrentDocumentName] = useState(null);
    const [dialogs, setDialogs] = useState({
        open: {
            visible: false
        },
        save: {
            visible: false
        }
    });
    const [socket, setSocket] = useState();

    useEffect(() => {
        setSocket(socketIOClient(REACT_APP_API_HOSTNAME));
    }, []);

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

        socket.emit("open", docId);

        socket.on("update", data => {
            // Only update if it was somebody else, and content doesn't differ
            // (to avoid excessive updates and bad UX)
            if (data.by !== appInstanceId && editorRef.current.getContent() !== data.content) {
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
            socket.emit("update", {
                by: appInstanceId,
                _id: currentDocumentId,
                name: currentDocumentName,
                content: editorRef.current.getContent()
            });
        }
    };

    return (
        <div className="App">
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
            <OpenDialog
                dialogs={dialogs}
                setDialogs={setDialogs}
                onSubmit={openDocument}
                documents={documents}
                setDocuments={setDocuments}
            />
            <ContentEditor
                editorRef={editorRef}
                socket={socket}
                currentDocumentId={currentDocumentId}
                currentDocumentName={currentDocumentName}
                sendUpdateToBackend={sendUpdateToBackend}
            />
        </div>
    );
}

export default App;