import React, {useEffect} from "react";
import Dialog from "../Dialog/Dialog";

function OpenDialog (props) {
    useEffect(() => {
        props.setDocuments(null);
        props.fetchDocuments();
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
        <div>
            <p>Select the document to open:</p>
            <ul>
                {listItems}
            </ul>
        </div>
    );

    return (
        <Dialog
            title="Open"
            name="open"
            closeLabel="Close"
            submitLabel="Open"
            setActiveDialog={props.setActiveDialog}
            contents={contents}
            onSubmit={props.onSubmit}
        />
    );
}

export default OpenDialog;