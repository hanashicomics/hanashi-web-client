import {Link, useParams} from "react-router-dom";
import StoryFooterNavigation from './StoryFooterNavigation.jsx';
import {useEffect, useState} from "react";
import "../assets/styles/App.css"
import {getStoryByTitle, updateStory} from "../lib/db.js";
import ConfirmModal from "../modals/ConfirmModal.jsx";

export default function Locations(){
    const {storyName} = useParams();
    const[locations, setLocations] = useState([]);
    const[story,setStory] = useState({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const[locationNameToBeDeleted, setlocationNameToBeDeleted] = useState("");

    const getTheStory = async (storyName) => {
        const storyInfo = await getStoryByTitle(storyName);
        setStory(storyInfo);
        setLocations(storyInfo.locations);
    }

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        const updatedArr = locations.filter(loc => loc.name !== locationNameToBeDeleted);
        setLocations(updatedArr);
        updateStory({
            ...await getStoryByTitle(storyName),
            title: storyName,
            locations: updatedArr
        })
        setModalOpen(true)
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    useEffect(() => {
        getTheStory(storyName);
    },[])

    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>

            <h1>Locations</h1>
            <ConfirmModal
                isOpen={showConfirm}
                message="Are you sure you want to delete this location? This action cannot be undone.!"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
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
                                <button
                                    className="delete-btn"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        setlocationNameToBeDeleted(location.name);
                                        handleDelete();
                                    }}
                                >
                                    Delete
                                </button>
                            </div>

                        </Link>
                    ))
                }
            </div>
        </>
    )
}