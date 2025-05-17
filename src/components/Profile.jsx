import Login from "./Login.jsx";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../firebase/firebase.js";
import '../assets/styles/Profile.css';
import {getSingleUserFromIDB} from "../lib/db.js";
import {useEffect, useState} from "react";

export default function Profile() {
    const navigate = useNavigate();
    const[email, setEmail] = useState("");

    const handleLogout = async () => {
        if (confirm("Are you sure you want to logout?") == true) {
            await logoutUser();
            window.location.reload();
            navigate("/profile")
        } else {
            console.log("logout cancelled")
        }
    }
    async function getUserData() {
        const userStuff = await getSingleUserFromIDB();
        setEmail(userStuff.email);
    }
    useEffect(() => {
        getUserData();
    },[])

    const user={
        // name: sessionStorage.getItem("email") || "Hanashi User",
        // email: sessionStorage.getItem("email") ||"user@example.com",
        avatar: "public/pfp.jpg" };
    return (
        <>
            <div className="profile-container">
                {
                    !email || email ==="" ? <Login /> :
                        <>
                            <div className="profile-container">
                                <div className="profile-card">
                                    <img
                                        src={user.avatar }
                                        alt="User Avatar"
                                        className="profile-avatar"
                                    />
                                    <h2 className="profile-name">{email}</h2>
                                    <p className="profile-email">{email}</p>
                                    <button className="profile-btn">Edit Profile</button>
                                    <br/>
                                    <button className={"profile-btn"} onClick={handleLogout}>Logout</button>
                                </div>
                            </div>

                        </>
                }
            </div>

        </>
    )
}