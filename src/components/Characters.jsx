import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Characters.css'
import StoryNavigation from "./StoryNavigation.jsx";
import RootNavigation from "./RootNavigation.jsx";
export default function Characters() {
    const {storyName} = useParams();
    const[characters, setCharacters] = useState([]);

    useEffect(() => {
        const storyData = sessionStorage.getItem(storyName);
        if (storyData) {
            const storyJson = JSON.parse(storyData);
            if(storyJson.characters)
            setCharacters(storyJson.characters);
        }
        else{
            alert('Could not find character data.');
        }
    },[])
    return (
        <>
            <RootNavigation />
            <StoryNavigation storyName={storyName}/>

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