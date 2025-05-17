import '../assets/styles/Navigation.css'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faStream, faUserFriends, faMapMarkerAlt, faFileExport } from '@fortawesome/free-solid-svg-icons';

export default function StoryFooterNavigation({storyName}){
    return(
        <>
            <div className="NavigationLinks">
                <li>
                    <Link to={`/${storyName}/info`} className={"iconlink"}>
                        <FontAwesomeIcon icon={faInfoCircle} /> Info
                    </Link>
                </li>
                <li>
                    <Link to={`/${storyName}/arcs`} className={"iconlink"}>
                        <FontAwesomeIcon icon={faStream} /> Arcs
                    </Link>
                </li>
                <li>
                    <Link to={`/${storyName}/characters`} className={"iconlink"}>
                        <FontAwesomeIcon icon={faUserFriends} /> Characters
                    </Link>
                </li>
                <li>
                    <Link to={`/${storyName}/locations`} className={"iconlink"}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Locations
                    </Link>
                </li>
                <li>
                    <Link to={`/${storyName}/export`} className={"iconlink"}>
                        <FontAwesomeIcon icon={faFileExport} /> Export
                    </Link>
                </li>
            </div>

        </>
    )
}