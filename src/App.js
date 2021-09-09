import React, {useEffect, useRef, useState} from "react";
import { Editor } from '@tinymce/tinymce-react';
import './App.css';
import {getTinymce} from "@tinymce/tinymce-react/lib/es2015/main/ts/TinyMCE";
import Toolbar from "./components/Toolbar/Toolbar";
import Dialog from "./components/Dialog/Dialog";

function App() {
    const editorRef = useRef(null);

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
    const documents = [];

    const newDocument = () => {
        setCurrentDocumentId(null);
        setCurrentDocumentName(null);
        editorRef.current.setContent("");
    };

    const openDocument = () => {
        const currentDialogs = Object.assign({}, dialogs);
        currentDialogs.open.visible = true;
        setDialogs(currentDialogs);
    }

    const openDialog = dialogs.open.visible ? (
        <Dialog
            title="Open"
            name="open"
            closeLabel="Close"
            submitLabel="Open"
            dialogs={dialogs}
            setDialogs={setDialogs}
        />
    ) : [];

    return (
        <div className="App">
            <Toolbar
                currentDocumentId={currentDocumentId}
                setCurrentDocumentId={setCurrentDocumentId}
                dialogs={dialogs}
                setDialogs={setDialogs}
                editorRef={editorRef}
                newDocument={newDocument}
                openDocument={openDocument}
            />
            {openDialog}
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'new save open undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    setup: function (editor) {
                        editor.ui.registry.addButton('save', {
                            text: 'Save',
                            icon: 'save',
                            onAction: function (_) {
                                const tinymce = getTinymce();
                                let currentDocumentName = "";
                                if (currentDocumentId) {
                                    currentDocumentName = documents.find(d => d._id === currentDocumentId).name;
                                }

                                tinymce.activeEditor.windowManager.open({
                                    title: "Save",
                                    body: {
                                        type: "panel",
                                        items: [
                                            {
                                                type: 'htmlpanel',
                                                html: `
                                                    <form name="saveDocumentForm">
                                                    <p>Please provide information about your document.</p>
                                                    <label for="documentName">Document name:</label>
                                                    <input type="text" id="documentName" placeholder="Document name" value="${currentDocumentName.replaceAll('"', '&quot;')}"/>
                                                    </form>
                                                `
                                            }
                                        ]
                                    },
                                    buttons: [
                                        {
                                            type: 'submit',
                                            text: 'Save',
                                            primary: true
                                        }
                                    ],
                                    onSubmit: async function(dialogApi) {
                                        const documentName = document.querySelector("#documentName").value;

                                        if (currentDocumentId) {
                                            // Update
                                            const newDocuments = Object.assign({}, documents);
                                            const documentIndex = newDocuments.findIndex(d => d._id === currentDocumentId);

                                            await fetch(`https://peer19api.azurewebsites.net/v1/documents/${currentDocumentId}`, {
                                                method: "PUT",
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    _id: currentDocumentId,
                                                    name: documentName,
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
                                                    name: documentName,
                                                    contents: editorRef.current.getContent()
                                                })
                                            })
                                                .then(res => res.json());
                                            setCurrentDocumentId(newDocument._id);
                                            const newDocuments = Object.assign({}, documents);
                                        }

                                        dialogApi.close();
                                    }
                                });
                            }
                        });

                        editor.ui.registry.addButton('open', {
                            text: 'Open',
                            icon: 'upload',
                            onAction: async function (_) {
                                const tinymce = getTinymce();
                                const documents = await fetch("https://peer19api.azurewebsites.net/v1/documents")
                                    .then(res => res.json());

                                let html = "";
                                let checked = "checked";

                                documents.forEach(d => {
                                    html += `
                                <li>
                                    <input type="radio" ${checked} id="document_${d._id}" name="documentId" value="${d._id}"/>
                                    <label for="document_${d._id}">${d.name}</label>
                                </li>
                            `;

                                    checked = "";
                                });
                                html = `
                            <form name="openDocumentForm">
                            <p>Select the document to open:</p>
                            <ul>
                                ${html}
                            </ul>
                            </form>
                        `;

                                tinymce.activeEditor.windowManager.open({
                                    title: "Open",
                                    body: {
                                        type: "panel",
                                        items: [
                                            {
                                                type: 'htmlpanel',
                                                html
                                            }
                                        ]
                                    },
                                    buttons: [
                                        {
                                            type: 'submit',
                                            text: 'Open',
                                            primary: true
                                        }
                                    ],
                                    onSubmit: function(dialogApi) {
                                        const docId = document.querySelector("input[name='documentId']:checked").value;
                                        setCurrentDocumentId(docId);
                                        const currentDocument = documents.find(d => d._id === docId);
                                        editorRef.current.setContent(currentDocument.contents);
                                        dialogApi.close();
                                    }
                                });
                            }
                        })
                    }
                }}
            />
        </div>
    );
}

export default App;
