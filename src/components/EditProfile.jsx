import React, {useEffect, useState} from 'react';
import {getSingleUserFromIDB} from "../lib/db.js";
import {resetPassword} from "../firebase/firebase.js";
import "../assets/styles/EditProfile.css"
import MessageModal from "../modals/MessageModal.jsx";

export default function EditProfile() {
    const[email, setEmail] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const handleResetPassword = async () => {
        await resetPassword(email);

        setModalOpen(true)
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
            <MessageModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                }}
                message={`Password reset email sent to ${email}`}
            />
            <h3>Account Actions</h3>
            <button className="action-button reset" onClick={handleResetPassword}>
                Reset Password
            </button>
            {/*<button className="action-button change" onClick={handleChangeEmail}>*/}
            {/*    Change Email*/}
            {/*</button>*/}
        </div>
    );
};