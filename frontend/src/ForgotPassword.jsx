import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OtpTimer from "otp-timer";
import OtpInput from "react-otp-input";
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isOtp, setIsOtp] = useState(false);
    const [userOtp, setUserOtp] = useState('');
    //     const [user, setUser] = useState();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [expirytime, setExpiryTime] = useState('')
    // const generateOtp = () => {
    //     return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    // };

    const ForgotPassword = async () => {
        try {
            // const response = await axios.patch('http://localhost:6080/user/forgotpassword', { email });
            const response = await axios.patch('http://localhost:6080/Forgotpassword', { email });
            console.log(response);
            if (response.data.msgId) {
                //     const generatedOtp = generateOtp();
                //     setUserOtp(generatedOtp.toString()); //setUser(user);
                setIsOtp(true);
                // console.log(response.data);
                // console.log(response.data.user);
                // console.log(response.data.user.otp);
                // console.log(response.data.user.otp);
                setUserOtp(response.data.userEmails.otp);
                setExpiryTime(response.data.userEmails.expiration_time);
                setError('Otp sent successfully!!!');

                //     // const to = email;
                //     // const subject = "OTP Verification";
                //     // const message = `Your OTP: ${generatedOtp}`;

                //     // await axios.patch('http://localhost:6080/user/createMail', { to, subject, message });
            }
        } catch (err) {
            // setError('Error sending OTP. Please try again.');
        }
    };

    const submitOtp = () => {
        console.log(`userOtp:  `, userOtp)
        console.log(`otp:  `, otp)
        if (!userOtp || new Date() >= expirytime) { //!user.otp
            setError("OTP Expired");
        } else if (userOtp === otp && new Date() < expirytime) { //(user.otp == otp)
            navigate('/newpassword');
        } else {
            setError("Wrong OTP");
        }
    };

    // const handlePaste = (event) => {
    //     const pastedData = event.clipboardData.getData("text");
    //     console.log("Pasted OTP:", pastedData);
    //     setOtp(pastedData.slice(0, 6)); // Limit to 6 digits
    // }
    const handleTimerComplete = () => {
        // console.log("Timer finished! Run your custom logic here.");
        setError("OTP expired")
        // setTimerExpired(true);
        setIsOtp(false);
    };
    return (
        <>
            <h2>Forgot Password</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button onClick={ForgotPassword}>Send OTP</button>

            {/* timer, refresh otp icon or {isOtp?. */}
            {isOtp && (
                <>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                    />
                    {/* <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        separator={<span>-</span>}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        onPaste={handlePaste} // Handling paste event
                    /> */}
                    <button onClick={submitOtp}>Submit OTP</button>
                    {/* <OtpTimer seconds={1} minutes={1} /> */}
                    <OtpTimer
                        seconds={1}
                        minutes={1}
                        onTimerComplete={handleTimerComplete} // Custom callback
                        button={false} // If applicable, hides default resend button
                    />

                    {/* resend={() => { setIsOtp(false) }} */}
                    {/* resend={this.handleClick}  */}
                    {/* timer, refresh otp icon */}
                </>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
};

export default ForgotPassword;
