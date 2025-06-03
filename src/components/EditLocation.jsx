import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {syncIDBToFirebasePro, updateDocument} from "../firebase/firebase.js";
import {getStoryByTitle, updateStory} from "../lib/db.js";
import MessageModal from "../modals/MessageModal.jsx";


export default function EditLocation(){
    const {storyName} = useParams();
    const {locationName} = useParams();
    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const[cover,setCover] = useState("");
    const[locations, setLocations] = useState([]);
    const[story,setStory] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();


    const getTheStory = async (storyName) => {
        const storyInfo = await getStoryByTitle(storyName);
        setStory(storyInfo);
        setLocations(storyInfo.locations);
    };

    useEffect(() => {
        getTheStory(storyName);
    },[])

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

    //const storyObj = JSON.parse(sessionStorage.getItem(storyName));
    //const arrLocations = storyObj.locations;

    useEffect(() => {
        let foundLoc;
        for(let i = 0; i<locations.length; i++){
            if(locations[i].name === locationName){
                foundLoc = locations[i];
                setName(foundLoc.name);
                setDescription(foundLoc.description);
                setCover(foundLoc.cover);
                return;
            }
        }
    }, []);

    const saveLocation = async ()=>{
        const newCharacter = {
            name: name,
            description: description,
            cover: cover
        }
        for(let i = 0; i<locations.length; i++){
            if(locations[i].name === locationName){
                locations[i] = newCharacter;
                break;
            }
        }
        const updatedStory = {...story, locations: locations};
        await updateStory(updatedStory);
        //const story = sessionStorage.getItem(storyName);
        //const jsonStory = JSON.parse(story);
        //jsonStory.characters.push(newCharacter);
        //console.log(jsonStory);
        //sessionStorage.setItem(storyName, JSON.stringify(jsonStory));
        //await updateDocument("stories",jsonStory.id,jsonStory);

        await syncIDBToFirebasePro();
        setModalOpen(true)

    }

    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>
            <MessageModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    navigate(`/${storyName}/locations`)
                }}
                message="Location Saved Successfully."
            />
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