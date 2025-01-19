import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './assets/styles/Characters.css'
export default function Characters() {
    const {storyName} = useParams();
    const[characters, setCharacters] = useState([]);

    useEffect(() => {
        const storyData = sessionStorage.getItem(storyName);
        if (storyData) {
            const storyJson = JSON.parse(storyData);
            setCharacters(storyJson.characters);
        }
        else{
            alert('Could not find character data.');
        }
    },[])
    return (
        <>
            <div className="createCharacterHeader">
                <h1>Characters</h1>
                <Link to={'/createstory'}> Create a character +</Link>
            </div>

            <div className={'myChars'}>
                {characters.map((character, index) => (
                    <div key={index} className={'CharCard'}>
                        <h5>{character.name}</h5>
                        <img src={character.cover} width={100} height={200} alt="" className={'CharCover'}/>
                        <p className={'CharRole'}>{character.role}</p>
                        <button>Edit</button>
                    </div>
                )
                )}
            </div>
        </>
    )
}