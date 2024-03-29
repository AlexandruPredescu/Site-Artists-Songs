let url = "http://127.0.0.1:3000/";

let globalParameters = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
};

module.exports.globalParameters = globalParameters;
module.exports.url = url;
