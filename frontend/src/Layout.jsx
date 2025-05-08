import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
    // const user = JSON.parse(localStorage.getItem("user"));

    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    // const userName = user?.userEmail?.name || "";

    const rawUser = localStorage.getItem("user");
    // console.log('rawUser:', rawUser);

    const parsedUser = rawUser ? JSON.parse(rawUser) : null;
    // console.log('parsedUser:', parsedUser);

    const user = (parsedUser && parsedUser.userEmail) ? parsedUser : null;
    // console.log('user:', user);

    // const userName = user?.userEmail?.name || "";
    const userName = typeof user?.userEmail?.name === "string" ? user.userEmail.name : "";

    // console.log('username:', userName);

    const [tokenExists, setTokenExists] = useState(() => !!(
        JSON.parse(localStorage.getItem("user"))?.token));

    const navigate = useNavigate();
    return (

        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>

            {/* Top Area: Dynamic height */}
            {/* <div style={{ padding: '20px', background: 'lightblue' }}> */}
            {/* Top content (auto height, can grow) */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
                    padding: '1rem 2rem',
                    color: '#fff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Segoe UI, sans-serif',
                    position: 'sticky',
                    top: 0,
                    zIndex: 999,
                    border: 'brown solid 5px',
                    // width: '100vw'
                }}>
                {/* Logo / Brand */}
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', letterSpacing: '1px', border: 'white solid 2px' }}> 🛍️ SAGAR MART </div>

                {/* Right side nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <button style={{ ...navItemStyle, backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => { navigate('/usersignup') }}>Signup</button>
                    <button
                        style={{ ...navItemStyle, cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: (!user || !user.token) ? '' : '20px' }}
                        onClick={() => {
                            (!user || !user.token) ? navigate('/login') : (alert('confirm logout?'), localStorage.removeItem("user"), navigate('/logout')
                            /*-->(msg:) logout successful ,, "login again" button[(onClick -> empty localStorage, navigate to login)] */)
                        }}
                    >
                        {(!user || !user.token) ? "Login" : "Logout"}
                    </button>
                    {
                        user?.token && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <div style={avatarStyle}>{userName[0]?.toUpperCase()}</div>
                                <span style={{ fontSize: '1rem' }}>{userName}</span>
                                {/* <div style={avatarStyle}>
                                    {user.userEmail.name[0].toUpperCase()}</div> */}
                                {/* <span style={{ fontSize: '1rem' }}>{user.userEmail.name}</span> */}
                            </div>
                        )
                    }
                </div>
            </div>
            {/* </div> */}

            {/* Bottom Area: Takes remaining height */}
            {/* , paddingBottom: tokenExists ? '71px' : '0px' */}
            <div style={{ display: 'flex', flex: 1, overflow: 'auto', background: 'lightgray', border: '8px solid black' }}>
                {/* overflow: 'auto', */}
                {/* Bottom content (flex: 1 fills remaining space) */}
                <Outlet />
            </div>

        </div >

    );
};

// Reusable styles
const navItemStyle = { fontSize: '1rem', transition: '0.3s', cursor: 'pointer', };
const avatarStyle = {
    width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fff', color: '#2a5298',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
};

export default Layout;
