import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Characters.css'
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {getStoryByTitle, updateStory} from "../lib/db.js";
import ConfirmModal from "../modals/ConfirmModal.jsx";
import MessageModal from "../modals/MessageModal.jsx";

export default function Characters() {
    const {storyName} = useParams();
    const[characters, setCharacters] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const[characterNameToBeDeleted, setcharacterNameToBeDeleted] = useState("");

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        const updatedArr = characters.filter(char => char.name !== characterNameToBeDeleted);
        setCharacters(updatedArr);
        updateStory({
            ...await getStoryByTitle(storyName),
            title: storyName,
            characters: updatedArr
        })
        setModalOpen(true)
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    const getTheStory = async (storyName) => {
        const storyInfo = await getStoryByTitle(storyName);
        const chars = storyInfo.characters;
        setCharacters(chars);
    };

    useEffect(() => {
        //const storyData = sessionStorage.getItem(storyName);
        getTheStory(storyName);

        if(characters.length < 1){
            alert('Could not find character data.');
        }
    },[])
    return (
        <>
            <StoryFooterNavigation storyName={storyName}/>

            <div className="createCharacterHeader">
                <h1>Characters</h1>
                <Link to={`/${storyName}/createcharacter`} className={"LinkButton"}> Create a character +</Link>
            </div>
<br/>
            <ConfirmModal
                isOpen={showConfirm}
                message="Are you sure you want to delete this character? This action cannot be undone.!"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <div className="cards-grid">
                {characters.length < 1 ? <div>No characters found.</div> :
                    characters.map((character, index) => (
                        <Link to={`/${storyName}/characters/${character.name}`} key={index}>
                            <div className="card">
                                <img src={character.cover} alt={`${character.name} Cover`} className="card-img" />
                                <div className="card-text">
                                    <h3 className="card-title">{character.name}</h3>
                                    <p className="card-role">{character.role}</p>
                                </div>
                                <button
                                    className="delete-btn"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        setcharacterNameToBeDeleted(character.name);
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