export default function getDataFromServer(url, callback) {
        let ajaxReq = new XMLHttpRequest();
        ajaxReq.open('GET', url, true);
        ajaxReq.onreadystatechange = () => {
            if (ajaxReq.readyState !== 4) return;

            if (ajaxReq.status !== 200) {
                console.log(new Error(`${ajaxReq.status}:${ajaxReq.statusText}`));
            } else {
                callback(JSON.parse(ajaxReq.responseText, (key, value) => {
                    if (key === 'createdAt') return new Date(value);
                    return value;
                }));
            }
        };
        ajaxReq.send();
}