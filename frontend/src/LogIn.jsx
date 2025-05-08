import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const Navigates = useNavigate();
    const [redirectPath, setRedirectPath] = useState("");
    const login = async () => {
        const { data } = await axios.post("http://localhost:6080/login", { email, password }); //token, data
        // console.log(`>>>>data>>>>`, data);
        // console.log(`result=`,result);
        // { data, token }
        // console.log(`result.data`,result.data)
        // console.log(`result.token`, result.token);
        // console.log(`token`, data.token);
        localStorage.setItem("user", JSON.stringify(data));

        // Retrieve the stored route or default to "/"
        let redirectPath = localStorage.getItem("redirectAfterLogin") || "/";

        // **Role-Based Route Handling**
        const role = data.userEmail.role;

        const allowedRoutes = {
            // supplier: "/user/supplierDashboard",
            supplier: "/supplierDashboard",
            // admin: "/user/adminView",
            admin: "/adminView",
            // user: "/user/userDashboard"
            user: "/userDashboard"
        };

        // console.log(`Object.values(allowedRoutes).includes(redirectPath):`, Object.values(allowedRoutes).includes(redirectPath));
        // console.log(`Object.values(allowedRoutes)`, Object.values(allowedRoutes));


        // Check if the stored redirect path is allowed for this role
        if (!redirectPath || !Object.values(allowedRoutes).includes(redirectPath)) {
            // console.log(`>>>login64>>>>`);
            redirectPath = allowedRoutes[role];
            // setRedirectPath(allowedRoutes[role]);
            // redirectPath = allowedRoutes[role]; // Fallback to the correct role-based dashboard
        }

        // Remove stored route after using it
        localStorage.removeItem("redirectAfterLogin");

        // // Redirect based on role if needed
        // if (redirectPath === "/") {
        //     if (data.userEmail.role === "supplier") {
        //         Navigates("/supplierDashboard");
        //     } else if (data.userEmail.role === "admin") {
        //         Navigates("/adminView");
        //     } else {
        //         Navigates("/userDashboard");
        //     }
        // } else {
        //     Navigates(redirectPath);
        // }
        // console.log(`>>>>redirectPath>>>>`, redirectPath);

        Navigates(redirectPath);
    }
    // console.log(`>>>>redirectPath89>>>>`, redirectPath);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: '10px', border: '1px solid black' }}>
                <label style={{ marginBottom: '10px' }}> <b> Login </b> </label>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                    {/* alignItems: 'flex-start', */}
                    <form>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <label htmlFor='email' style={{ marginTop: '6px', marginBottom: '8px' }}>Email Address:</label>
                            <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginTop: '8px', marginBottom: '8px', width: '98%' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <label htmlFor='password' style={{ marginTop: '6px', marginBottom: '8px' }}>Password:</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginTop: '8px', marginBottom: '8px', width: '98%' }} />
                        </div>
                    </form>
                </div>
                <div>
                    {/* style={{ marginTop: '20px' }} */}
                    <div>
                        {/* style={{ marginTop: '40px' }} */}
                        <button style={{ width: '75%', border: '1px solid black', padding: '10px', }} onClick={login}> Login </button>
                        <button
                            style={{ width: '24%', border: '1px solid black' }}
                            onClick={
                                () => {
                                    // Retrieve the stored route or default to "/"
                                    // let redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
                                    // Navigates(redirectPath);
                                    Navigates("/userDashboard");
                                }
                            }
                        > Back </button>
                        {/* <Link to=>  */}
                        {/* <span onClick={() => { Navigates("/user/ForgotPassword") }} style={{ cursor: "pointer" }}>Forgot Password</span> */}
                        <span onClick={() => { Navigates("/ForgotPassword") }} style={{ cursor: "pointer" }}>Forgot Password</span>
                        {/* </Link> 
                        <Link>  */}
                        <span onClick={() => { Navigates(''); }} style={{ cursor: "pointer" }}> Reset Password </span>
                        {/* </Link> */}
                        <div> Not Signed Up? <span onClick={() => { Navigates("/usersignup") }} style={{ cursor: "pointer", color: 'black', textDecoration: 'underline', textDecorationThickness: '2px' }}> Sign Up </span> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LogIn;