import React, {useRef} from "react";
import { Editor } from '@tinymce/tinymce-react';
import './App.css';
import {getTinymce} from "@tinymce/tinymce-react/lib/es2015/main/ts/TinyMCE";

function App() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const state = {};
  state.test = "test";

  return (
    <div className="App">
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
            toolbar: 'save open undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            setup: function (editor) {
                editor.ui.registry.addButton('save', {
                    text: 'Save',
                    icon: 'save',
                    onAction: function (_) {
                        log();
                    }
                });

                editor.ui.registry.addButton('open', {
                    text: 'Open',
                    icon: 'upload',
                    onAction: async function (_) {
                        const tinymce = getTinymce();

                        state.documents = await fetch("http://localhost:1337/v1/documents")
                            .then(res => res.json());

                        let html = "";
                        let checked = "checked";

                        state.documents.forEach(d => {
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
                                state.currentDocumentId = document.querySelector("input[name='documentId']:checked").value;
                                const currentDocument = state.documents.find(d => d._id === state.currentDocumentId);
                                editorRef.current.setContent(currentDocument.contents);
                                dialogApi.close();
                            }
                        })
                    }
                })
            }
          }}
        />
    </div>
  );
}

export default App;
