import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {syncIDBToFirebasePro, updateDocument} from "../firebase/firebase.js";
import {getStoryByTitle, updateStory} from "../lib/db.js";
import MessageModal from "../modals/MessageModal.jsx";


export default function EditCharacter(){
    const {characterName} = useParams();
    const {storyName} = useParams();
    const[story, setStory] = useState({});
    const[name, setName] = useState("");
    const[age,setAge] = useState(0);
    const[description, setDescription] = useState("");
    const[abilities,setAbilities] = useState("");
    const[cover,setCover] = useState("");
    const navigate = useNavigate();
    const [arrCharacters, setArrCharacters] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    //const storyObj = JSON.parse(sessionStorage.getItem(storyName));
    //const arrCharacters = storyObj.characters;

    const getTheStory = async (storyName) => {
        const fetchedStory = await getStoryByTitle(storyName);
        setStory(fetchedStory);
        setArrCharacters(fetchedStory.characters);

        let foundChar;
        for (let i = 0; i < fetchedStory.characters.length; i++) {
            if (fetchedStory.characters[i].name === characterName) {
                foundChar = fetchedStory.characters[i];
                setName(foundChar.name);
                setAge(foundChar.age);
                setDescription(foundChar.description);
                setCover(foundChar.cover);
                setAbilities(foundChar.abilities);
                return;
            }
        }
    };


    useEffect(() => {
        getTheStory(storyName);
    }, []);

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onAgeChange = (e) => {
        setAge(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const onAbilitiesChange = (e) => {
        setAbilities(e.target.value);
    }
    const onImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = ()=>{
                const cover64 = reader.result;
                setCover(cover64);
            }
        }
        else{
            alert('Something went wrong. Please select an image.');
        }
    }

    const saveCharacter = async ()=>{
        const newCharacter = {
            name: name,
            age: age,
            description: description,
            abilities: abilities,
            cover: cover
        }

        for(let i = 0; i<arrCharacters.length; i++){
            if(arrCharacters[i].name === characterName) {
                arrCharacters[i] = newCharacter;
                //sessionStorage.setItem(storyName, JSON.stringify(storyObj));
               // await updateDocument("stories",storyObj.id,storyObj);

                arrCharacters[i] = newCharacter;
                story.characters = arrCharacters;
                await updateStory(story)
                await syncIDBToFirebasePro();
                setModalOpen(true)
            }
        }
    }

    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>
            <MessageModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    navigate(`/${storyName}/characters`);
                }}
                message="Character Saved Successfully."
            />
            <div className='TextContainer'>
                <p>
                    <label>Name </label>
                    <input name="name" type="text" value={name} onChange={onNameChange} required/>
                </p>

                <p>
                    <label>Age </label>
                    <input name="age" type="text" value={age} onChange={onAgeChange} required/>
                </p>

                <p>
                    <label>Description </label>
                    <textarea name="description" value={description} onChange={onDescriptionChange} required/>
                </p>


                <p>
                    <label>Abilities </label>
                    <input name="abilities" type="text" value={abilities} onChange={onAbilitiesChange} required/>
                </p>
            </div>


            <div className='imageContainer'>
                <p>
                    <label>Image </label>
                    <br/>
                    <img src={cover} width="50%" height="50%"/>
                    <br/>
                    <input name="image" type="file" onChange={onImageChange}/>
                </p>
            </div>

            <p>
                <button onClick={saveCharacter}>Save Character</button>
            </p>
        </>
    )
}