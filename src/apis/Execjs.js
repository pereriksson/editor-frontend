
class Execjs {
    async run(code) {
        const data = await fetch("https://execjs.emilfolino.se/code", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: btoa(code)
            })
        })
            .then(res => res.json())
            .then(res => res.data);
        return atob(data);
    }
}

export default Execjs;