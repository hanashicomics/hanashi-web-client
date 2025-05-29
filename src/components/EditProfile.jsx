import React, {useEffect, useState} from 'react';
import {getSingleUserFromIDB} from "../lib/db.js";
import {resetPassword} from "../firebase/firebase.js";
import "../assets/styles/EditProfile.css"

export default function EditProfile() {
    const[email, setEmail] = useState("");

    const handleResetPassword = async () => {
        await resetPassword(email);
        alert(
            `Password reset email sent to ${email}`
        )
    };

    const handleChangeEmail = async () => {

    };

    async function getUserData() {
        const userStuff = await getSingleUserFromIDB();
        setEmail(userStuff.email);
    }

    useEffect(() => {
        getUserData();
    },[])

    return (
        <div className="account-actions">
            <h3>Account Actions</h3>
            <button className="action-button reset" onClick={handleResetPassword}>
                Reset Password
            </button>
            <button className="action-button change" onClick={handleChangeEmail}>
                Change Email
            </button>
        </div>
    );
};