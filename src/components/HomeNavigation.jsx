import '../assets/styles/Navigation.css'
import {Link} from "react-router-dom";

export default function RootNavigation(){
    return(
        <>
            <div className="NavigationLinks">
                <div className="nav-left">
                    <h1>
                        <Link to={'/'} className="Logo">Hanashi</Link>
                    </h1>
                </div>
                {/*<div className="nav">*/}
                {/*    <Link to={'/pricing'} className="linkButton">Pricing</Link>*/}
                {/*</div>*/}
                {/*<div className="nav-right">*/}
                {/*    <Link to={'/profile'} className="navigation-link-goto">Go to Dashboard</Link>*/}
                {/*</div>*/}
            </div>
        </>

    )
}