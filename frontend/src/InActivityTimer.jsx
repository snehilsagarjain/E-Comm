// // import { useEffect, useRef, useState } from 'react';
// // import { io } from 'socket.io-client';
// // // import jwtDecode from 'jwt-decode';
// // import { jwtDecode } from 'jwt-decode'; // ✅ Correct way
// // import axios from 'axios';
// // import { Navigate, useNavigate } from 'react-router-dom';

// // const socket = io('http://localhost:6080'); // your backend URL

// // const InactivityTimer = ({ timeout = 10000 }) => { //5 * 60 * 1000
// //     const [remaining, setRemaining] = useState(timeout);
// //     const [showWarning, setShowWarning] = useState(false);
// //     // const [visible, setVisible] = useState(false);

// //     const [showModal, setShowModal] = useState(false);
// //     const userId = useRef(null);
// //     const countdownRef = useRef(null);
// //     const pollingRef = useRef(null);
// //     const timeoutRef = useRef(null);
// //     // const timerRef = useRef(null);

// //     const [initialized, setInitialized] = useState(false); // initially false
// //     const navigate = useNavigate();
// //     // useEffect(() => {
// //     //     console.log('17InactivityTimer');

// //     //     // const token = localStorage.getItem('token');
// //     //     const user = JSON.parse(localStorage.getItem("user"));
// //     //     console.log('user:', user);

// //     //     // if (!user?.token) {
// //     //     //     // clearInterval(interval);
// //     //     //     clearTimeout(timeoutRef.current);
// //     //     //     clearInterval(countdownRef.current);
// //     //     //     clearInterval(pollingRef.current);
// //     //     //     socket.disconnect(); // Optional: stop socket activity
// //     //     //     return;
// //     //     // }

// //     //     // if (user?.token) {}
// //     //     const token = user?.token;
// //     //     console.log('token:', token);

// //     //     if (!token) { return; }

// //     //     const decoded = jwtDecode(token);
// //     //     console.log('decoded:', decoded);

// //     //     userId.current = decoded.id;
// //     //     console.log('userId.current:', userId.current);

// //     //     socket.emit('activity', userId.current);

// //     //     resetAllTimers();
// //     //     pollingRef.current = setInterval(checkLastActivity, 30 * 1000);

// //     //     socket.on(`activity-${userId.current}`, () => {
// //     //         // resetTimer();
// //     //         resetAllTimers();
// //     //     });

// //     //     // Add event listeners for local activity
// //     //     const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
// //     //     events.forEach(e => window.addEventListener(e, activityHandler));
// //     //     // startInactivityCheck();

// //     //     return () => {
// //     //         clearTimeout(timeoutRef.current);
// //     //         // clearInterval(timerRef.current);
// //     //         clearInterval(countdownRef.current);
// //     //         clearInterval(pollingRef.current);
// //     //         socket.off(`activity-${userId.current}`);
// //     //     };
// //     // }, []);

// //     // useEffect(() => {
// //     //     const checkToken = setInterval(() => {
// //     //         const user = JSON.parse(localStorage.getItem("user"));
// //     //         const token = user?.token;

// //     //         if (token) {
// //     //             clearInterval(checkToken);
// //     //             initializeTimers(token);
// //     //         }
// //     //     }, 1000);

// //     //     return () => clearInterval(checkToken);
// //     // }, []);
// //     // clearTimeout(timeoutRef.current);
// //     // // clearInterval(timerRef.current);
// //     // clearInterval(countdownRef.current);
// //     // clearInterval(pollingRef.current);
// //     // socket.off(`activity-${userId.current}`);
// //     const initializeTimers = (token) => {
// //         const decoded = jwtDecode(token);
// //         userId.current = decoded.id;

// //         socket.emit('activity', userId.current);

// //         resetAllTimers();
// //         pollingRef.current = setInterval(checkLastActivity, 30 * 1000);

// //         // socket.on(`activity-${userId.current}`, () => {
// //         //     resetAllTimers();
// //         // });
// //         socket.on(`activity-${userId.current}`, debounce(() => {
// //             resetAllTimers();
// //         }, 1000)); // Only resets if idle for 1s between events

// //         // const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
// //         // events.forEach(e => window.addEventListener(e, activityHandler));
// //     };

// //     const debounce = (func, delay) => {
// //         let timer;
// //         return function (...args) {
// //             clearTimeout(timer);
// //             timer = setTimeout(() => func(...args), delay);
// //         };
// //     };

// //     // useEffect(() => {
// //     //     const interval = setInterval(() => {
// //     //         const user = JSON.parse(localStorage.getItem("user"));
// //     //         if (!user?.token) {
// //     //             clearInterval(interval);
// //     //             clearTimeout(timeoutRef.current);
// //     //             clearInterval(countdownRef.current);
// //     //             clearInterval(pollingRef.current);
// //     //             socket.disconnect(); // Optional: stop socket activity
// //     //         }
// //     //     }, 1000);

// //     //     return () => clearInterval(interval);
// //     // }, []);

// //     useEffect(() => {
// //         const interval = setInterval(() => {
// //             const user = JSON.parse(localStorage.getItem("user"));
// //             const token = user?.token;

// //             if (!user || !user.token) return; // prevent running if already logged out
// //             if (token && !initialized) {
// //                 clearInterval(interval);         // ✅ Stop checking
// //                 initializeTimers(token);         // ✅ Set up inactivity logic
// //                 setInitialized(true);            // ✅ Prevent re-running
// //             }
// //         }, 1000); // check every second

// //         return () => clearInterval(interval);
// //     }, [initialized]); // 🔁 re-checks if initialized changes

// //     const activityHandler = () => {
// //         console.log("activityHandler");

// //         resetAllTimers();
// //         socket.emit('activity', userId.current);
// //     };

// //     const checkLastActivity = async () => {
// //         try {
// //             const res = await axios.get('/api/logs/last-activity');
// //             const last = new Date(res.data.lastActivity);
// //             const now = new Date();
// //             const diff = now - last;

// //             if (diff >= timeout) logout();
// //             else resetAllTimers(); // Extend session if still active
// //         } catch (err) {
// //             console.error('Polling check failed', err);
// //         }
// //     };
// //     const startCountdown = () => {
// //         // clearInterval(countdownRef.current);
// //         if (countdownRef.current) clearInterval(countdownRef.current);
// //         countdownRef.current = setInterval(() => {
// //             setRemaining((prev) => {
// //                 if (prev <= 1000) {
// //                     clearInterval(countdownRef.current);
// //                     return 0;
// //                 }
// //                 return prev - 1000;
// //             });
// //         }, 1000);
// //         setShowWarning(true);
// //     };
// //     //condition: if remaining <= 5minutes then setShowWarning(true);
// //     //timeout: 15 minutes
// //     //remove token or jwt token expire only when user gets inactive

// //     const resetAllTimers = () => {
// //         setRemaining(timeout);
// //         clearTimeout(timeoutRef.current);
// //         clearInterval(countdownRef.current);

// //         setShowWarning(false);
// //         setShowModal(false);
// //         timeoutRef.current = setTimeout(() => { setShowModal(true); }, timeout);
// //         startCountdown();
// //     };

// //     //timeoutRef -- setTimeout -- after timeout seconds -- model set true
// //     //remaining = timeout,, (now)set warning = true,, countdownRef -- setInterval -- after every 1 second -- set remaining decreasing 1 second every time => (atleast now)display timer shown as remaining, updating every second

// //     // const startInactivityCheck = () => {
// //     //     clearInterval(timerRef.current);
// //     //     timerRef.current = setInterval(() => {
// //     //         setRemaining((prev) => {
// //     //             if (prev <= 1000) {
// //     //                 clearInterval(timerRef.current);
// //     //                 setShowModal(true);
// //     //                 return 0;
// //     //             }
// //     //             return prev - 1000;
// //     //         });
// //     //     }, 1000);
// //     //     setVisible(true);
// //     // };
// //     // const resetTimer = () => {
// //     //     clearInterval(timerRef.current);
// //     //     setRemaining(timeout);
// //     //     setVisible(false);
// //     //     setShowModal(false);
// //     // };

// const logout = () => {
//     console.log("161");

//     localStorage.removeItem("user");
//     // window.location.href = '/login';
//     navigate("/logout");
// };
// const logout = () => {
//     localStorage.removeItem("user");
//     socket.disconnect();
//     setInitialized(false); // 🔁 Re-enable token watcher
//     navigate("/login");
//     // fallback
//     setTimeout(() => window.location.href = '/login', 200);
// };

// //     const stayLoggedIn = () => {
// //         // resetTimer();
// //         socket.emit('activity', userId.current);
// //         resetAllTimers();
// //     };

// //     const formatTime = (ms) => {
// //         const sec = Math.floor(ms / 1000); //console.log('sec:', sec);
// //         const min = String(Math.floor(sec / 60)).padStart(2, '0'); //console.log('min:', min);
// //         const remSec = String(sec % 60).padStart(2, '0'); //console.log('remsec:', remSec);
// //         return `${min}:${remSec}`;
// //     };
// //     if (!showWarning) return null;
// //     // if (!visible) return null;
// //     // console.log('remaining:', remaining);
// //     return (
// //         <div style={styles.container}>
// //             <p>
// //                 You will be logged out in <strong>{formatTime(remaining)}</strong> due to inactivity.
// //             </p>
// //             <button onClick={stayLoggedIn} style={styles.button}>Stay Logged In</button>

// //             {showModal && (
// //                 <div style={styles.modal}>
// //                     <h3>Confirm Logout</h3>
// //                     <p>You're about to be logged out due to inactivity.</p>
// //                     <button onClick={logout} style={styles.button}>Logout Now</button>
// //                     <button onClick={stayLoggedIn} style={styles.button}>Stay Logged In</button>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// const styles = {
//     container: {
//         position: 'fixed',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         background: '#fff5f5',
//         borderTop: '2px solid #ff4d4f',
//         padding: '10px',
//         textAlign: 'center',
//         zIndex: 1000,
//     },
//     button: {
//         marginLeft: 10,
//         padding: '6px 12px',
//         background: '#4caf50',
//         color: '#fff',
//         border: 'none',
//         borderRadius: 4,
//         cursor: 'pointer',
//     },
//     modal: {
//         position: 'fixed',
//         top: '30%',
//         left: '30%',
//         right: '30%',
//         background: 'white',
//         border: '1px solid gray',
//         borderRadius: 8,
//         padding: 20,
//         textAlign: 'center',
//         zIndex: 2000,
//     },
// };

// // export default InactivityTimer;

// import { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const socket = io('http://localhost:6080'); // Your backend URL

// const InactivityTimer = ({ timeout = 5 * 60 * 1000 }) => {
//     const [remaining, setRemaining] = useState(timeout);
//     const [showWarning, setShowWarning] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [initialized, setInitialized] = useState(false);

//     const userId = useRef(null);
//     const countdownRef = useRef(null);
//     const pollingRef = useRef(null);
//     const timeoutRef = useRef(null);
//     const lastResetTime = useRef(0);
//     const navigate = useNavigate();

//     // Format time mm:ss
//     const formatTime = (ms) => {
//         const sec = Math.floor(ms / 1000);
//         const min = String(Math.floor(sec / 60)).padStart(2, '0');
//         const remSec = String(sec % 60).padStart(2, '0');
//         return `${min}:${remSec}`;
//     };

//     const logout = () => {
//         localStorage.removeItem("user");
//         socket.disconnect();
//         setInitialized(false); // allow re-initialization if user logs back in
//         navigate("/login");
//         // fallback
//         setTimeout(() => window.location.href = '/login', 200);
//     };

//     const stayLoggedIn = () => {
//         socket.emit('activity', userId.current);
//         resetAllTimers();
//     };

//     const activityHandler = () => {
//         console.log("activityHandler");
//         socket.emit('activity', userId.current);
//         resetAllTimers();
//     };

//     const checkLastActivity = async () => {
//         try {
//             const res = await axios.get('/api/logs/last-activity');
//             const last = new Date(res.data.lastActivity);
//             const now = new Date();
//             const diff = now - last;
//             if (diff >= timeout) logout();
//             else resetAllTimers(); // still active, just reset
//         } catch (err) {
//             console.error('Polling failed', err);
//         }
//     };

//     const startCountdown = () => {
//         // clearInterval(countdownRef.current);
//         if (countdownRef.current) clearInterval(countdownRef.current);
//         countdownRef.current = setInterval(() => {
//             setRemaining(prev => {
//                 if (prev <= 1000) {
//                     clearInterval(countdownRef.current);
//                     return 0;
//                 }
//                 return prev - 1000;
//             });
//         }, 1000);
//         setShowWarning(true);
//     };

//     const resetAllTimers = () => {
//         const now = Date.now();
//         if (now - lastResetTime.current < 1000) return; // throttle (1s min gap)
//         lastResetTime.current = now;
//         setRemaining(timeout);
//         clearTimeout(timeoutRef.current);
//         clearInterval(countdownRef.current);

//         setShowWarning(false);
//         setShowModal(false);
//         timeoutRef.current = setTimeout(() => setShowModal(true), timeout);
//         startCountdown();
//     };

//     const initializeTimers = (token) => {
//         const decoded = jwtDecode(token);
//         userId.current = decoded.id;

//         socket.emit('activity', userId.current);
//         resetAllTimers();

//         pollingRef.current = setInterval(checkLastActivity, 30 * 1000);

//         socket.on(`activity-${userId.current}`, () => {
//             resetAllTimers(); // triggered from other tabs/devices
//         });
//         // socket.on(`activity-${userId.current}`, debounce(() => {
//         //     resetAllTimers();
//         // }, 1000)); // Only resets if idle for 1s between events

//         const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
//         events.forEach(e => window.addEventListener(e, activityHandler));
//     };
//     //     const debounce = (func, delay) => {
//     //         let timer;
//     //         return function (...args) {
//     //             clearTimeout(timer);
//     //             timer = setTimeout(() => func(...args), delay);
//     //         };
//     //     };
//     useEffect(() => {
//         const interval = setInterval(() => {
//             const user = JSON.parse(localStorage.getItem("user"));
//             const token = user?.token;
//             if (!user || !user.token) {
//                 console.log('423token:', token);
//                 return;
//             } // prevent running if already logged out
//             if (token && !initialized) {
//                 clearInterval(interval);
//                 initializeTimers(token);
//                 setInitialized(true);
//             }
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [initialized]);

//     useEffect(() => {
//         return () => {
//             clearTimeout(timeoutRef.current);
//             clearInterval(countdownRef.current);
//             clearInterval(pollingRef.current);
//             if (userId.current) {
//                 socket.off(`activity-${userId.current}`);
//             }
//         };
//     }, []);

//     if (!showWarning) return null;

//     return (
//         <div style={styles.container}>
//             <p>
//                 You will be logged out in <strong>{formatTime(remaining)}</strong> due to inactivity.
//             </p>
//             <button onClick={stayLoggedIn} style={styles.button}>Stay Logged In</button>

//             {showModal && (
//                 <div style={styles.modal}>
//                     <h3>Confirm Logout</h3>
//                     <p>You're about to be logged out due to inactivity.</p>
//                     <button onClick={logout} style={styles.button}>Logout Now</button>
//                     <button onClick={stayLoggedIn} style={styles.button}>Stay Logged In</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// const styles = {
//     container: {
//         position: 'fixed',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         background: '#fff5f5',
//         borderTop: '2px solid #ff4d4f',
//         padding: '10px',
//         textAlign: 'center',
//         zIndex: 1000,
//     },
//     button: {
//         marginLeft: 10,
//         padding: '6px 12px',
//         background: '#4caf50',
//         color: '#fff',
//         border: 'none',
//         borderRadius: 4,
//         cursor: 'pointer',
//     },
//     modal: {
//         position: 'fixed',
//         top: '30%',
//         left: '30%',
//         right: '30%',
//         background: 'white',
//         border: '1px solid gray',
//         borderRadius: 8,
//         padding: 20,
//         textAlign: 'center',
//         zIndex: 2000,
//     },
// };

// export default InactivityTimer;


import useInactivityTimer from "./hooks/useInactivityTimer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InactivityTimer = () => {
    const navigate = useNavigate();
    const [tokenExists, setTokenExists] = useState(() => !!(
        JSON.parse(localStorage.getItem("user"))?.token));
    const [restartKey, setRestartKey] = useState(0); // force hook to re-run
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(null);

    const handleLogout = () => {
        setShowModal(false);
        localStorage.removeItem("user");
        setTokenExists(false);
        // navigate("/login");
        navigate("/logout");
    };

    const stayLoggedIn = () => {
        setRestartKey(prev => prev + 1); // reset the timer
        setShowModal(false);
    };

    const timerCountdown = useInactivityTimer(() => { setTokenExists(true) }, () => { setShowModal(true); }, restartKey);
    useEffect(() => { console.log(timerCountdown); setCountdown(timerCountdown); }, [timerCountdown]);
    //OR
    // const countdown = useInactivityTimer(10, handleLogout);
    // const countdown = useInactivityTimer(() => { setShowModal(true); }, restartKey); //10, handleLogout

    // Re-check token on mount or change
    useEffect(() => {
        const interval = setInterval(() => {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            // console.log('540', token);
            const hasToken = !!token;
            if (hasToken && !tokenExists) {
                // Token appeared after login → restart timer
                setRestartKey(prev => prev + 1);
            }
            // setTokenExists(hasToken); //
            // setTokenExists(!!token);
        }, 1000);
        return () => clearInterval(interval);
    }, [tokenExists]);

    if (!tokenExists) return null;
    console.log('546', !tokenExists);

    return (
        // <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-xl shadow-lg z-50">
        //     <p className="text-sm">Auto logout in: {countdown} sec</p>
        // </div>
        <div style={styles.container}>
            <p>
                You will be logged out in <strong>{countdown}</strong> due to inactivity.
                {/* {formatTime(remaining)} */}
            </p>
            <button onClick={stayLoggedIn} style={styles.button}>Stay Logged In</button>

            {showModal && (
                <div style={styles.modal}>
                    <h3>Confirm Logout</h3>
                    <p>You're about to be logged out due to inactivity.</p>
                    <button onClick={handleLogout} style={styles.button}>Logout Now</button>
                    <button onClick={stayLoggedIn} style={styles.button}>Stay Logged In</button>
                </div>
            )}
        </div>
    );
};
const styles = {
    container: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff5f5',
        borderTop: '2px solid #ff4d4f',
        padding: '10px',
        textAlign: 'center',
        zIndex: 1000,
    },
    button: {
        marginLeft: 10,
        padding: '6px 12px',
        background: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
    },
    modal: {
        position: 'fixed',
        top: '30%',
        left: '30%',
        right: '30%',
        background: 'white',
        border: '1px solid gray',
        borderRadius: 8,
        padding: 20,
        textAlign: 'center',
        zIndex: 2000,
    },
};

export default InactivityTimer;
