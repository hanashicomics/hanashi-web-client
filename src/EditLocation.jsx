import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";


export default function EditLocation(){
    const {storyName} = useParams();
    const {locationName} = useParams();
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

    const storyObj = JSON.parse(sessionStorage.getItem(storyName));
    const arrLocations = storyObj.locations;

    useEffect(() => {
        let foundLoc;
        for(let i = 0; i<arrLocations.length; i++){
            if(arrLocations[i].name === locationName){
                foundLoc = arrLocations[i];
                setName(foundLoc.name);
                setDescription(foundLoc.description);
                setCover(foundLoc.cover);
                return;
            }
        }
    }, []);

    const saveLocation = ()=>{
        const newCharacter = {
            name: name,
            description: description,
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
                <button onClick={saveLocation}>Save Location</button>
            </p>
        </>
    )
}