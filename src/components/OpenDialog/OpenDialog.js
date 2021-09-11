import React, {useEffect, useState} from "react";
import Dialog from "../Dialog/Dialog";

function OpenDialog (props) {
    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://peer19api.azurewebsites.net/v1/documents")
                .then(res => res.json());

            props.setDocuments(res);
        }

        fetchData();
    }, []);

    let contents;
    let listItems;

    if (props.documents) {
        let checked;

        listItems = props.documents.map((d, index) => {
            checked = (index === 0) ? "defaultChecked" : "";
            let id = "document_"+d._id;

            return (
                <li key={d._id}>
                    <input type="radio" defaultChecked={checked} id={id} name="documentId" value={d._id}/>
                    <label htmlFor={id}> {d.name}</label>
                </li>
            );
        });
    }

    contents = (
        <form name="openDocumentForm">
            <p>Select the document to open:</p>
            <ul>
                {listItems}
            </ul>
        </form>
    );

    const openDialog = props.dialogs.open.visible ? (
        <Dialog
            title="Open"
            name="open"
            closeLabel="Close"
            submitLabel="Open"
            dialogs={props.dialogs}
            setDialogs={props.setDialogs}
            contents={contents}
            onSubmit={props.onSubmit}
        />
    ) : [];

    return openDialog;
}

export default OpenDialog;