import axios from 'axios'
let url;

switch (process.env.REACT_APP_ENVIRONMENT) {
    case "DEVELOPMENT":
        url = 'http://localhost:5000';
        break;
    case "PRODUCTION":
        url = 'http://localhost:5000';
        break;
    default:
        url = 'http://localhost:5000';
        break;
}

const instance = axios.create({
    baseURL: url
})

export default instance;