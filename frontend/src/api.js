import axios from "axios";
import { useLocation } from 'react-router-dom';

const api = axios.create({
    baseURL: "http://localhost:6080", // Base URL for all API calls
    headers: { "Content-Type": "application/json", },
});

// Attach Authorization token dynamically for every request
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.token) { config.headers.Authorization = `Bearer ${user.token}`; }
        return config;
    },
    (error) => Promise.reject(error)
);

// ~ ~ axios.setup.js
// Add interceptor once, globally
// api.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && error.response.status === 401) {
//             console.log(`>>>>>>api:: error.response.data.message:`, error.response.data.message);

//             // const location = useLocation();  // used in functional components
//             localStorage.removeItem("token");
//             localStorage.removeItem("tokenExpiry");
//             // localStorage.setItem("redirectAfterLogin", location.pathname);
//             localStorage.setItem("redirectAfterLogin", window.location.pathname);
//             // window.location.href = "/login"; // Redirect on token expiry
//             window.location.href = "/redirect"; // Redirect on token expiry
//         }
//         return Promise.reject(error);
//     }
// );
// console.log('message:', message);

export default api;
