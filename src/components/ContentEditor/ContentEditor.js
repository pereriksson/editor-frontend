import React from "react";
import {Editor} from "@tinymce/tinymce-react";
import {TINYMCE_API_KEY} from "../../constants";

function ContentEditor(props) {
    return (
        <Editor
            apiKey={TINYMCE_API_KEY}
            onInit={(evt, editor) => {
                props.editorRef.current = editor;
            }}
            onChange={(event, editor) => {
                props.sendUpdateToBackend();
            }}
            initialValue={props.contents}
            init={{
                height: "100%",
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'save undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
    );
}

export default ContentEditor;