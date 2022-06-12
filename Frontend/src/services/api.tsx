import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://127.0.0.1:9000/', //urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
export default api;
