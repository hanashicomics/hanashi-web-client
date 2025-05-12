import {Link, useParams} from "react-router-dom";
import StoryFooterNavigation from './StoryFooterNavigation.jsx';
import {useEffect, useState} from "react";

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

            <Link to={`/${storyName}/createlocation`}> Create a location +</Link>

            <div className={'myLocations'}>
                {locations.map((location, index) => (
                        <Link to={`/${storyName}/locations/${location.name}`} key={index}>
                            <div className={'CharCard'}>
                                <h5>{location.name}</h5>
                                <img src={location.cover} width={'25%'} height={'25%'} alt="" className={'CharCover'}/>
                            </div>
                        </Link>

                    )
                )}
            </div>
        </>
    )
}