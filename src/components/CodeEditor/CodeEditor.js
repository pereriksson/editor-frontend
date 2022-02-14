import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import './CodeEditor.css';

export default function CodeEditor(props) {
    return (
        <div className="code-view">
            <CodeMirror
                value={props.currentDocumentCode}
                extensions={[javascript({ jsx: true })]}
                onChange={(value, viewUpdate) => {
                    props.setCurrentDocumentCode(value);
                }}
            />
            <div className="result">
                <h2>Result:</h2>
                <div className="output">{props.codeResult}</div>
            </div>
        </div>
    );
}