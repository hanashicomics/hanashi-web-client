import '../assets/styles/Navigation.css'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSingleUserFromIDB} from "../lib/db.js";

export default function AppNavigation(){
    const[userData, setUserData] = useState({});
    const navigate = useNavigate();
    const[isLoggedIn, setIsLoggedIn] = useState("");

    async function getUserData() {
        const userStuff = await getSingleUserFromIDB();
        setUserData(userStuff);
        setIsLoggedIn(userStuff.uid);
    }

    useEffect(()=>{
        getUserData();
        // if(userData.uid !== null){
        //     navigate("/stories");
        // }
    },[])

    return(
        <>
            <div className="NavigationLinks">
                <div className="nav-left">
                    <h1>
                        <Link to={isLoggedIn != null ? '/stories' : '/'} className="Logo">Hanashi</Link>
                    </h1>
                </div>

                <div className="nav-right">
                    <Link to="/stories" className="Links">Stories</Link>
                    <Link to="/profile" className="Links">Profile</Link>
                    <Link to="/settings" className="Links">Settings</Link>
                </div>
            </div>

        </>
    )
}