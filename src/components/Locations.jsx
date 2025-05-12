import {Link, useParams} from "react-router-dom";
import StoryFooterNavigation from './StoryFooterNavigation.jsx';
import {useEffect, useState} from "react";
import "../assets/styles/App.css"

export default function Locations(){
    const {storyName} = useParams();
    const[locations, setLocations] = useState([]);

    useEffect(() => {
        const storyData = sessionStorage.getItem(storyName);
        if (storyData) {
            const storyJson = JSON.parse(storyData);

            if(storyJson.locations){
                setLocations(storyJson.locations);
            }
        }
        else{
            alert('Could not find location data.');
        }
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