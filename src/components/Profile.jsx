import Login from "./Login.jsx";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../firebase/firebase.js";
import '../assets/styles/Profile.css';
import {getSingleUserFromIDB} from "../lib/db.js";
import {useEffect, useState} from "react";



export default function Profile() {
    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[plan, setPlan] = useState("");
    const[upgradedAt, setUpgradedAt] = useState("");

    function goToEdit() {
        navigate("/editprofile");
    }

    const handleLogout = async () => {
        if (confirm("Are you sure you want to logout?") == true) {
            await logoutUser();
            window.location.reload();
            navigate("/profile")
        } else {
            console.log("logout cancelled")
        }
    }

    const formatUpgradedAt = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return "";

        const ms = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
        return new Date(ms).toLocaleString();
    };

    async function getUserData() {
        const userStuff = await getSingleUserFromIDB();
        setEmail(userStuff.email);
        setPlan(userStuff.plan);
        setUpgradedAt(formatUpgradedAt(userStuff.upgradedAt));
    }

    useEffect(() => {
        getUserData();
    },[])

    const user={
        avatar: "/pfp.jpg" };
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
                                    <p className="profile-email">User Subscription: {plan}</p>
                                    {plan === "pro" ? <p className="profile-email">Last Upgraded At: {upgradedAt}</p>:""}
                                    {/*<p className="profile-email">Last Upgraded At: {upgradedAt}</p>*/}
                                    <button className="profile-btn" onClick={goToEdit}>Edit Profile</button>
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