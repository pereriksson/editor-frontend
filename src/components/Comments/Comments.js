import React, {useState} from 'react';
import './Comments.css';
import CommentsInspector from "../CommentsInspector/CommentsInspector";

const Comments = props => {
    const [selectedNode, setSelectedNode] = useState(null);

    const commentsInspector = (selectedNode !== null) ? (
        <CommentsInspector
            selectedNode={selectedNode}
            currentDocumentComments={props.currentDocumentComments}
            setCurrentDocumentComments={props.setCurrentDocumentComments}
        />
    ) : (
        <div className="inspect">
            <p>Please select a paragraph to add a comment.</p>
        </div>
    );

    return (
        <div className="comments-view">
            <div
                className="document"
                onClick={e => {
                    const element = e.target;

                    if (["H1", "H2", "H3", "H4", "H5", "H6", "PRE", "P"].includes(element.tagName)) {
                        const index = Array.from(element.parentNode.children).indexOf(element);
                        setSelectedNode(index);
                    } else {
                        setSelectedNode(null);
                    }
                }}
                dangerouslySetInnerHTML={{__html: props.contents}}
            />
            {commentsInspector}
        </div>
    )
}

export default Comments;