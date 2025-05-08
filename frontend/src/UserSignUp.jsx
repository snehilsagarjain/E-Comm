import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const SupplierSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const submitForm = async (e) => {
        console.log(`isChecked:`, isChecked);
        if (isChecked) { await axios.post('http://localhost:6080/user/createUser', { email, password, name, phone, role: 'admin' }); }
        else { await axios.post("http://localhost:6080/user/createUser", { email, password, name, phone }); }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: '10px', border: '1px solid black' }}>
                <label style={{ marginBottom: '10px' }}> <b> User Sign Up </b> </label>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginTop: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <label htmlFor='email' style={{ marginTop: '6px', marginBottom: '8px' }}>Email Address:</label>
                        <label htmlFor='password' style={{ marginTop: '6px', marginBottom: '8px' }}>Password:</label>
                        <label htmlFor='name' style={{ marginTop: '6px', marginBottom: '8px' }}>Name:</label>
                        <label htmlFor='phone' style={{ marginTop: '5px', marginBottom: '8px' }}>Phone:</label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginTop: '8px', marginBottom: '8px', width: '98%' }} />
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginTop: '8px', marginBottom: '8px', width: '98%' }} />
                        <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} style={{ marginTop: '8px', marginBottom: '8px', width: '98%' }} />
                        <input type="text" id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} style={{ marginTop: '8px', marginBottom: '8px', width: '98%' }} />
                    </div>
                </div>
                <div> <input type='checkbox' checked={isChecked} onChange={(e) => { setIsChecked(!isChecked); }} /> <label> As Admin </label> </div>
                <div style={{ marginTop: '20px' }}>
                    <button style={{ width: '100%', border: '1px solid black', padding: '10px' }} onClick={submitForm}>Submit User Details</button>
                    <div style={{ marginTop: '40px' }}>
                        {/* <Link to="/sellersignup">  */}
                        <button style={{ border: '1px solid black' }} onClick={() => { navigate("/sellersignup") }}>Seller Sign Up</button>
                        {/* </Link> */}
                        {/* <Link to="/sellersignup"> */}
                        <button
                            style={{ border: '1px solid black' }}
                            onClick={
                                () => {
                                    // Retrieve the stored route or default to "/"
                                    // let redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
                                    let redirectPath = localStorage.getItem("redirectAfterLogin") || "/userDashboard";
                                    navigate(redirectPath);
                                }
                            }
                        > Back </button>
                        {/* </Link> */}
                        <div>Already signed up? <span onClick={() => { navigate("/login") }} style={{ cursor: "pointer", color: 'black', textDecoration: 'underline', textDecorationThickness: '2px' }} >Log In</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SupplierSignUp;