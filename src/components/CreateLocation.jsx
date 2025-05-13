import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import StoryNavigation from "./StoryNavigation.jsx";
import {updateDocument} from "../firebase/firebase.js";
import RootNavigation from "./RootNavigation.jsx";


export default function CreateLocation() {
    const {storyName} = useParams();
    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const[cover,setCover] = useState("");

    const navigate = useNavigate();

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
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

    const saveLocation = async ()=>{
        const newLocation = {
            name: name,
            description: description,
            cover: cover
        }

        const story = sessionStorage.getItem(storyName);
        const jsonStory = JSON.parse(story);
        jsonStory.locations.push(newLocation);
        sessionStorage.setItem(storyName, JSON.stringify(jsonStory));
        await updateDocument("stories",jsonStory.id,jsonStory);
        alert('Location Saved Successfully.');
        navigate(`/${storyName}/locations`)

    }

    return(
        <>
            <RootNavigation />
            <StoryNavigation storyName={storyName}/>

            <div className='TextContainer'>
                <p>
                    <label>Name </label>
                    <input name="name" type="text" value={name} onChange={onNameChange} required/>
                </p>

                <p>
                    <label>Description </label>
                    <textarea name="description" value={description} onChange={onDescriptionChange} required/>
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
                <button onClick={saveLocation}>Save  Location</button>
            </p>
        </>
    )
}