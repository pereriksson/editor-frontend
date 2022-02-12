import React from "react";
import './Header.css';

function Header(props) {
    let title = props.currentDocumentName || "";

    const invite = props.currentDocumentId ? (
        <div className="invite">
            <button type="button" onClick={() => props.setActiveDialog('invite')}>Invite</button>
        </div>
    ) : null;

    return (
        <div className="header">
            <div className="left">
                <div className="branding">
                    <div className="logo"></div>
                </div>
                <div className="document-name">
                    <input
                        type="text"
                        value={title}
                        placeholder="Untitled document"
                        onChange={e => {
                            props.setCurrentDocumentName(e.target.value);
                        }}
                    />
                </div>
            </div>
            {invite}
        </div>
    );
}

export default Header;