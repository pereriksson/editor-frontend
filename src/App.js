import React, {useRef, useState} from "react";
import './App.css';
import Toolbar from "./components/Toolbar/Toolbar";
import OpenDialog from "./components/OpenDialog/OpenDialog";
import Header from "./components/Header/Header";
import ContentEditor from "./components/ContentEditor/ContentEditor";

function App() {
    const editorRef = useRef(null);

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
    };

    const saveDocument = async () => {
        if (currentDocumentId) {
            await fetch(`https://peer19api.azurewebsites.net/v1/documents/${currentDocumentId}`, {
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
            const newDocument = await fetch(`https://peer19api.azurewebsites.net/v1/documents`, {
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
            />
        </div>
    );
}

export default App;