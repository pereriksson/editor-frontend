import React from "react";
import {Editor} from "@tinymce/tinymce-react";

function ContentEditor(props) {
    return (
        <Editor
            onInit={(evt, editor) => props.editorRef.current = editor}
            init={{
                height: 500,
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
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                setup: function (editor) {

                }
            }}
        />
    );
}

export default ContentEditor;