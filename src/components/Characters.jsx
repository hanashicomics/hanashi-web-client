import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Characters.css'
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
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
            <StoryFooterNavigation storyName={storyName}/>

            <div className="createCharacterHeader">
                <h1>Characters</h1>
                <Link to={`/${storyName}/createcharacter`}> Create a character +</Link>
            </div>

            <div className={'myChars'}>
                {characters.map((character, index) => (
                        <Link to={`/${storyName}/characters/${character.name}`} key={index}>
                            <div className={'CharCard'}>
                                <h5>{character.name}</h5>
                                <img src={character.cover} width={'50%'} height={'50%'} alt="" className={'CharCover'}/>
                                <p className={'CharRole'}>{character.role}</p>
                            </div>
                        </Link>

                    )
                )}
            </div>
        </>
    )
}