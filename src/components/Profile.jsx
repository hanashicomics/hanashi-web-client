import Login from "./Login.jsx";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../firebase/firebase.js";
import '../assets/styles/Profile.css';

export default function Profile() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (confirm("Are you sure you want to logout?") == true) {
            sessionStorage.clear();
            await logoutUser();
            window.location.reload();
            navigate("/profile")
        } else {
            console.log("logout cancelled")
        }
    }

    const user={
        name: sessionStorage.getItem("email") || "Hanashi User",
        email: sessionStorage.getItem("email") ||"user@example.com",
        avatar: "https://commons.wikimedia.org/wiki/File:Profile_avatar_placeholder_large.png" };
    return (
        <>
            <div className="profile-container">
                {
                    !sessionStorage.getItem("email") ? <Login /> :
                        <>
                            <div className="profile-container">
                                <div className="profile-card">
                                    <img
                                        src={user.avatar }
                                        alt="User Avatar"
                                        className="profile-avatar"
                                    />
                                    <h2 className="profile-name">{user.name}</h2>
                                    <p className="profile-email">{user.email}</p>
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