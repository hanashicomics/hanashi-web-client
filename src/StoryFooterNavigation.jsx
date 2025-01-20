import './assets/styles/Navigation.css'
import {Link} from "react-router-dom";

export default function RootNavigation({storyName}){
    return(
        <>
            <div className="NavigationLinks">
                <li>
                    <Link to={`/${storyName}/info`}>Info</Link>
                </li>

                <li>
                    <Link to={`/${storyName}/timeline`}>Timeline</Link>
                </li>

                <li>
                    <Link to={`/${storyName}/arcs`}>Arcs</Link>
                </li>

                <li>
                    <Link to={`/${storyName}/characters`}>Characters</Link>
                </li>

                <li>
                    <Link to={`/${storyName}/export`}>Export</Link>
                </li>
            </div>
        </>
    )
}