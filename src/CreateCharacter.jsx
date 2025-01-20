import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Navigate} from 'react-router-dom';
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";

export default function CreateCharacter(){
    const {storyName} = useParams();

    const[name, setName] = useState("");
    const[age,setAge] = useState(0);
    const[description, setDescription] = useState("");
    const[abilities,setAbilities] = useState("");
    const[cover,setCover] = useState("");
    const navigate = useNavigate();

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

    const saveCharacter = ()=>{
        const newCharacter = {
            name: name,
            age: age,
            description: description,
            abilities: abilities,
            cover: cover
        }

        const story = sessionStorage.getItem(storyName);
        const jsonStory = JSON.parse(story);
         jsonStory.characters.push(newCharacter);
         console.log(jsonStory);
        sessionStorage.setItem(storyName, JSON.stringify(jsonStory));
        alert('Character Saved Successfully.');
        navigate(`/${storyName}/characters`)

    }

    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>

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
                <button onClick={saveCharacter}>Save Story</button>
            </p>
        </>
    )
}