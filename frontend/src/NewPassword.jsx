import React, { useState } from 'react'

const NewPassword = () => {
    // const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const updatePassword = () => {

    }
    return (
        <>
            <div>NewPassword</div>
            {/* <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} /> */}
            <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button onClick={updatePassword}>Update Password</button>
        </>
    )
}

export default NewPassword