import '../assets/styles/Navigation.css'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSingleUserFromIDB} from "../lib/db.js";

export default function AppNavigation(){
    const[userData, setUserData] = useState({});
    const navigate = useNavigate();
    const[plan,setPlan] = useState("");
    const[isLoggedIn, setIsLoggedIn] = useState("");

    async function getUserData() {
        const userStuff = await getSingleUserFromIDB();
        setUserData(userStuff);
        setPlan(userStuff.plan);
        setIsLoggedIn(userStuff.uid);
    }

    useEffect(()=>{
        getUserData();
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
                    {
                        plan ==="free"? <Link to={'/pricing'} className={"UpgradeLinks"}>Upgrade</Link> : ""
                    }
                    <Link to="/stories" className="Links">Stories</Link>
                    <Link to="/profile" className="Links">Profile</Link>
                </div>
            </div>

        </>
    )
}