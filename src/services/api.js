import axios from "axios";

const api = axios.create({

    baseURL: 'https://frank-jolly-puma.ngrok-free.app'

})

export default api;