import '../assets/styles/Navigation.css'
import {Link} from "react-router-dom";

export default function AppNavigation(){
    const isLoggedIn = sessionStorage.getItem("userid");
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