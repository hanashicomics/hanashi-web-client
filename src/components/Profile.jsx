import Login from "./Login.jsx";
import {useNavigate} from "react-router-dom";
import {getUserPlan, logoutUser} from "../firebase/firebase.js";
import '../assets/styles/Profile.css';
import {getSingleUserFromIDB, saveUserToIDB} from "../lib/db.js";
import {useEffect, useState} from "react";



export default function Profile() {
    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[plan, setPlan] = useState("");
    const[upgradedAt, setUpgradedAt] = useState("");
    const[expiresAt,setExpiresAt] = useState("");

    function goToEdit() {
        navigate("/editprofile");
    }

    async function handleUpgradeUpdate() {
        try {
            // Fetch the user details from IDB
            const userDetails = await getSingleUserFromIDB();

            const upgraded = await getUserPlan(userDetails.uid);

            if (upgraded) {
                // Update user details locally in IDB
                //const updatedUserDetails = { ...userDetails, plan: "pro",expiresAt:"" }; // Mark the user as upgraded

                await saveUserToIDB(upgraded)

                console.log("User details updated in IDB after upgrade!", upgraded);
            }
        } catch (error) {
            console.error("Failed to update IDB after upgrade:", error);
        }
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
        setExpiresAt(formatUpgradedAt(userStuff.pro_expires_at));
    }

    useEffect(() => {
        handleUpgradeUpdate();

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
                                    {plan === "pro" ? <p className="profile-email">Expires on: {expiresAt}</p>:""}
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