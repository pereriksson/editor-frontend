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

    if (props.documents) {
        let checked;

        const listItems = props.documents.map((d, index) => {
            checked = (index === 0) ? "defaultChecked" : "";
            let id = "document_"+d._id;

            return (
                <li key={d._id}>
                    <input type="radio" defaultChecked={checked} id={id} name="documentId" value={d._id}/>
                    <label htmlFor={id}> {d.name}</label>
                </li>
            );
        });

        contents = (
            <form name="openDocumentForm">
                <p>Select the document to open:</p>
                <ul>
                    {listItems}
                </ul>
            </form>
        );
    }

    return (
        <Dialog
            title={props.title}
            dialogs={props.dialogs}
            setDialogs={props.setDialogs}
            name={props.name}
            contents={contents}
            closeLabel={props.closeLabel}
            submitLabel={props.submitLabel}
            onSubmit={props.onSubmit}
        />
    )
}

export default OpenDialog;