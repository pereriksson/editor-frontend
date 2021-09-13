import {REACT_APP_API_HOSTNAME} from "../../constants";

class DocumentApi {
    async createDocument(name, contents) {
        return {
            name,
            contents,
            _id: "613a4ce6d742d5d000193b83"
        };
    }

    async updateDocument(_id, name, contents) {

    }

    async fetchDocuments() {
        return [
            {
                name: "",
                contents: "",
                _id: "613a4ce6d742d5d000193b83"
            },
            {
                name: "",
                contents: "",
                _id: "613a4ce6d742d5d000193b83"
            }
        ];
    }

    async loginUser(username, password) {
        if (username === "admin" && password === "admin") {
            this.authToken = "abc123";

            return {
                success: true,
                token: "..."
            };
        }

        return {
            success: false
        };
    }
}

export default DocumentApi;