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
        return await fetch(`${REACT_APP_API_HOSTNAME}/v1/graphql`, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                query: "{  documents {    name,    contents,    collaborators {      _id,      username    }  } }"
            })
        })
            .then(res => res.json())
            .then(res => res.data.documents)
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

    async registerUser(username, password) {
        const res = await fetch(`${REACT_APP_API_HOSTNAME}/v1/register`, {
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

        return res;
    }
}

export default new DocumentApi();