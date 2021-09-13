import {REACT_APP_API_HOSTNAME} from "../constants";

class DocumentApi {
    async createDocument(name, contents) {
        return await fetch(`${REACT_APP_API_HOSTNAME}/v1/documents`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.authToken}`
            },
            body: JSON.stringify({
                name,
                contents
            })
        })
            .then(res => res.json());
    }

    async updateDocument(_id, name, contents) {
        await fetch(`${REACT_APP_API_HOSTNAME}/v1/documents/${_id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.authToken}`
            },
            body: JSON.stringify({
                _id,
                name,
                contents
            })
        });
    }

    async fetchDocuments() {
        return await fetch(`${REACT_APP_API_HOSTNAME}/v1/documents`, {
            headers: {
                Authorization: `Bearer ${this.authToken}`
            }
        })
            .then(res => res.json());
    }

    async loginUser(username, password) {
        const res = await fetch(`${REACT_APP_API_HOSTNAME}/v1/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.json());

        if (res.success) {
            this.authToken = res["token"];
        }

        return res;
    }
}

export default new DocumentApi();