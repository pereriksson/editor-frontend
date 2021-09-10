import React from "react";
import Dialog from "../Dialog/Dialog";

function SaveDialog(props) {
    const currentDocumentName = (props.currentDocumentName) ? props.currentDocumentName.replaceAll('"', '&quot;') : "";

    let contents = (
        <form name="saveDocumentForm">
            <p>Please provide information about your document.</p>
            <label htmlFor="documentName">Document name:</label>
            <input
                type="text"
                id="documentName"
                placeholder="Document name"
                value={currentDocumentName}
                onChange={e => {
                    props.setCurrentDocumentName(e.target.value);
                }}
            />
            < /form>
    );

    return (
        <Dialog
            title="Save"
            name="save"
            closeLabel="Close"
            submitLabel="Save"
            dialogs={props.dialogs}
            setDialogs={props.setDialogs}
            contents={contents}
            onSubmit={props.onSubmit}
        />
    );
}

export default SaveDialog;