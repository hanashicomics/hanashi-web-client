import {Link} from "react-router-dom";
import '../assets/styles/Homenav.css'

export default function HomeNavigation() {

    return(
        <>
            <div className="NavigationLinks">
                <div className="nav-left">
                    <h1>
                        <Link to={'/'} className="Logo">Hanashi</Link>
                    </h1>
                </div>
                <div className="nav-right">
                    <Link to={"/login"} className="get-started-button">Login/Signup</Link>
                </div>
            </div>
        </>
    )
}