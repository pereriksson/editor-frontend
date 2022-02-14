import React, {useEffect} from "react";
import Dialog from "../Dialog/Dialog";

function OpenDialog (props) {
    useEffect(() => {
        async function fetchData() {
            props.setLoading(true);
            props.setDocuments(null);
            await props.fetchDocuments();
            props.setLoading(false);
        }
        fetchData();
    });

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

    contents = !props.loading ? (
        <div>
            <p>Select the document to open:</p>
            <ul>
                {listItems}
            </ul>
        </div>
    ) : (
        <div>
            <p className="loading">Loading...</p>
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