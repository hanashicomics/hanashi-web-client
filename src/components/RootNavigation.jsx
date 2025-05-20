import '../assets/styles/Navigation.css'
import {Link} from "react-router-dom";

export default function RootNavigation(){
    return(
        <>
            <div className="NavigationLinks">
                <li>
                    <h1>
                        <Link to={'/'} className={'Logo'}>Hanashi</Link>
                    </h1>
                </li>

                <Link to={'/stories'} className={"Links"}>Stories</Link>
                <Link to={'/profile'} className={"Links"}>Profile</Link>
           </div>
        </>
    )
}