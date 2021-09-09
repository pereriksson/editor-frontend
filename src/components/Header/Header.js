import React from "react";
import './Header.css';

function Header(props) {
    let title = props.currentDocumentName || "";

    return (
        <div className="header">
            <div className="branding">
                <div className="logo"></div>
            </div>
            <div className="document-name">
                <input
                    type="text"
                    value={title}
                    placeholder="Document title"
                    onChange={e => {
                        props.setCurrentDocumentName(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}

export default Header;