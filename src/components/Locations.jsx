import {Link, useParams} from "react-router-dom";
import StoryFooterNavigation from './StoryFooterNavigation.jsx';
import {useEffect, useState} from "react";
import "../assets/styles/App.css"
import {getStoryByTitle} from "../lib/db.js";

export default function Locations(){
    const {storyName} = useParams();
    const[locations, setLocations] = useState([]);
    const[story,setStory] = useState({});

    const getTheStory = async (storyName) => {
        const storyInfo = await getStoryByTitle(storyName);
        setStory(storyInfo);
        setLocations(storyInfo.locations);
    }

    useEffect(() => {
        getTheStory(storyName);
    },[])

    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>

            <h1>Locations</h1>

            <Link to={`/${storyName}/createlocation`} className={"LinkButton"}> Create a location +</Link>

            <div className="cards-grid">
                {locations.length < 1 ? <div>No locations found.</div> :
                    locations.map((location, index) => (
                        <Link to={`/${storyName}/locations/${location.name}`} key={index}>
                            <div className="card">
                                <img src={location.cover} alt={`${location.name} Cover`} className="card-img" />
                                <div className="card-text">
                                    <h3 className="card-title">{location.name}</h3>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}