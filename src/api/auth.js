import axios from "axios";

const API = axios.create({

    baseURL: "https://bmgum.onrender.com/api"

});

export default API;