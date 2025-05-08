// import { useEffect, useRef } from 'react';
// import axios from 'axios';
// // import { useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';
// // import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const socket = io('http://localhost:6080'); // ✅ your backend Socket.IO server

// const useInactivityTimer = ({ timeout = 5 * 60 * 1000, onTimeout }) => {
//     const timer = useRef(null);
//     const polling = useRef(null);
//     const userId = useRef(null);

//     const resetCountdown = () => {
//         clearTimeout(timer.current);
//         timer.current = setTimeout(onTimeout, timeout); // complete logout after timeout seconds
//     };

//     const activityHandler = () => {
//         resetCountdown();
//         socket.emit('activity', userId.current);
//     };

//     const checkLogActivity = async () => {
//         try {
//             const res = await axios.get('/api/logs/last-activity');
//             const last = new Date(res.data.lastActivity);
//             const now = new Date();
//             const diff = now - last;

//             if (diff >= timeout) onTimeout();
//             else resetCountdown();
//         } catch (err) {
//             console.error('Activity check failed', err);
//         }
//     };

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const decoded = jwtDecode(token);
//         userId.current = decoded.id;

//         // Setup timer + polling
//         resetCountdown();
//         polling.current = setInterval(checkLogActivity, 30 * 1000);

//         // Socket listener: reset timer when activity is broadcast from another tab/device
//         socket.on(`activity-${userId.current}`, () => { resetCountdown(); });

//         // Add event listeners for local activity
//         const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
//         events.forEach(e => window.addEventListener(e, activityHandler));

//         return () => {
//             clearInterval(polling.current);
//             clearTimeout(timer.current);
//             socket.off(`activity-${userId.current}`);
//             events.forEach(e => window.removeEventListener(e, activityHandler));
//         };
//     }, []);
// };

// export default useInactivityTimer;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correct named import
import axios from "axios";

// const TIMEOUT_SECONDS = 300; // 5 minutes inactivity timeout
// const TOKEN_REFRESH_THRESHOLD = 120; // refresh if less than 2 min left
// const TIMEOUT_SECONDS = 10; // 10sec.s inactivity timeout
// const TOKEN_REFRESH_THRESHOLD = 4; // refresh if less than 4sec.s left
const TIMEOUT_SECONDS = 140; // 10sec.s inactivity timeout
const TOKEN_REFRESH_THRESHOLD = 130; // refresh if less than 4sec.s left
const useInactivityTimer = (onwarning, onLogout, restartKey = 0) => { //timeoutSeconds = 10, 
    // console.log("76", restartKey);

    const [countdown, setCountdown] = useState(TIMEOUT_SECONDS);
    // const [countdown, setCountdown] = useState(timeoutSeconds);
    const activityEvents = ["mousemove", "keydown", "mousedown", "scroll", "touchstart"];
    const timerRef = useRef(null);
    const navigate = useNavigate();

    // // Reset countdown
    // const resetCountdown = () => {
    //     setCountdown(TIMEOUT_SECONDS);
    //     // setCountdown(timeoutSeconds); 
    //     maybeRefreshToken();
    // };

    // Start listening to user activity
    const startTracking = () => { activityEvents.forEach(event => { window.addEventListener(event, () => setCountdown(TIMEOUT_SECONDS)); }); }; //resetCountdown

    // Stop tracking user activity
    const stopTracking = () => { activityEvents.forEach(event => { window.removeEventListener(event, () => setCountdown(TIMEOUT_SECONDS)); }); }; //resetCountdown

    const maybeRefreshToken = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        if (!token) return;

        try {
            const { exp } = jwtDecode(token);
            console.log('exp:', exp);

            const now = Date.now() / 1000;
            console.log('now:', now);

            const timeLeft = exp - now;
            console.log(timeLeft);

            if (timeLeft < TOKEN_REFRESH_THRESHOLD && timeLeft < TIMEOUT_SECONDS) {
                const res = await axios.post('/api/refresh-token', {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                user.token = res.data.token; //console.log(user.token);
                localStorage.setItem('user', JSON.stringify(user));
                console.log('🔄 Token refreshed');
            }
        } catch (err) {
            console.error('Token refresh failed:', err);
            localStorage.removeItem('user');
            navigate('/login');
            // window.location.href = "/login";
        }
    };

    useEffect(() => {
        // Exit if no token found
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        // console.log('99use:', token);
        if (!token) return;
        // resetCountdown();
        setCountdown(TIMEOUT_SECONDS);
        startTracking();
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    stopTracking();
                    onLogout(); // logout logic
                    // //     //                 setShowModal(true);
                    return 0;
                }
                if (prev <= TOKEN_REFRESH_THRESHOLD) {
                    console.log('151: ', prev); onwarning();
                }
                return prev - 1;
            });
        }, 1000);

        setInterval(() => { maybeRefreshToken }, 1000);

        return () => {
            clearInterval(timerRef.current);
            stopTracking();
        };
    }, [restartKey]);

    return countdown;
};

export default useInactivityTimer;
