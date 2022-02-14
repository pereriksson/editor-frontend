import {createRef, useState} from 'react';
import './CommentsInspector.css';

const CommentsInspector = props => {
    const commentField = createRef();

    const getCommentByNodeId = (nodeId) => {
        const index = props.currentDocumentComments.findIndex(e => e.node === props.selectedNode);
        if (index !== -1) {
            return props.currentDocumentComments[index];
        }
        return null;
    }

    const saveComment = () => {
        const nodeId = props.selectedNode;
        const comment = commentField.current.value;
        const newState = [...props.currentDocumentComments];
        const index = props.currentDocumentComments.findIndex(e => e.node === nodeId);

        if (index !== -1) {
            newState[index].comment = comment;
        } else {
            newState.push({
                node: nodeId,
                comment: comment
            })
        }
        props.setCurrentDocumentComments(newState);
        setCommentText(commentField.current.value);
    }

    const comment = getCommentByNodeId(props.selectedNode);
    const [selectedNode, setSelectedNode] = useState(props.selectedNode);
    const [commentText, setCommentText] = useState(comment ? comment.comment : "");

    if (selectedNode !== props.selectedNode) {
        setSelectedNode(props.selectedNode);
        setCommentText(comment ? comment.comment : "");
    }

    return props.selectedNode !== null ? (
        <div className="inspect">
            <h2>Comments</h2>
            <textarea ref={commentField} placeholder="Enter your comments" onChange={saveComment} value={commentText}></textarea>
        </div>
    ) : null;
}

export default CommentsInspector;