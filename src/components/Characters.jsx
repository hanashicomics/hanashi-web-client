import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Characters.css'
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {getStoryByTitle} from "../lib/db.js";
export default function Characters() {
    const {storyName} = useParams();
    const[characters, setCharacters] = useState([]);

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
                            </div>
                        </Link>
                    ))
                }
            </div>

        </>
    )
}