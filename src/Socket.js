import {APP_INSTANCE_ID, REACT_APP_API_HOSTNAME} from "./constants";
import socketIOClient from "socket.io-client";

class Socket {
    constructor() {
        this.socket = socketIOClient(REACT_APP_API_HOSTNAME);
    }

    openDocument(docId) {
        this.socket.emit("open", docId);
    }

    onUpdate(callback) {
        this.socket.on("update", callback);
    }

    update(_id, name, content) {
        this.socket.emit("update", {
            by: APP_INSTANCE_ID,
            _id: _id,
            name: name,
            content: content
        });
    }
}

export default new Socket();