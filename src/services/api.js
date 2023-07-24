import axios from "axios";

const token = '877483580c33490eb7d65f8c0cb96c8d'

const api = axios.create({
    baseURL: ' https://api.football-data.org/',
    headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
})

export default api