import axios from "axios";
import addInterceptor from "./interceptor.js";

const client = () => {
    const config = {
        baseURL: "https://europe-west1-quickstart-1573558070219.cloudfunctions.net",
        headers: {}
    }

const instance = axios.create(config);
addInterceptor(instance);
return instance;
}

export default client()