import axios from 'axios';
const instance = axios.create({
    baseURL:"https://caffora-project.onrender.com/",
})

export default instance;