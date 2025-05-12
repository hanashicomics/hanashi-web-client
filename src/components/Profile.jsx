import Login from "./Login.jsx";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../firebase/firebase.js";

export default function Profile() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        sessionStorage.clear();
        await logoutUser();
        navigate("/profile")
    }

    return (
        <>
            {
                !sessionStorage.getItem("email") ? <Login /> :
                    <>
                        <h1>Profile</h1>
                        <h2>My Details</h2>
                        <p>Email: {sessionStorage.getItem("email")}</p>
                        <button className={"LinkButton"} onClick={handleLogout}>Logout</button>
                    </>
            }
        </>
    )
}