import '../assets/styles/Navigation.css'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faClock, faStream, faUserFriends, faMapMarkerAlt, faFileExport } from '@fortawesome/free-solid-svg-icons';

export default function StoryNavigation({storyName}){
    return(
        <>
            <div className="NavigationLinks">
                <li>
                    <Link to={`/${storyName}/info`}>
                        <FontAwesomeIcon icon={faInfoCircle} /> Info
                    </Link>
                </li>
                <li>
                    <Link to={`/${storyName}/timeline`}>
                        <FontAwesomeIcon icon={faClock} /> Timeline
                    </Link>
                </li>
                <li>
                    <Link to={`/${storyName}/arcs`}>
                        <FontAwesomeIcon icon={faStream} /> Arcs
                    </Link>
                </li>
                <li>
                    <Link to={`/${storyName}/characters`}>
                        <FontAwesomeIcon icon={faUserFriends} /> Characters
                    </Link>
                </li>
                <li>
                    <Link to={`/${storyName}/locations`}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Locations
                    </Link>
                </li>
                <li>
                    <Link to={`/${storyName}/export`}>
                        <FontAwesomeIcon icon={faFileExport} /> Export
                    </Link>
                </li>
            </div>

        </>
    )
}