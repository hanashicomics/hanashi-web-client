import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {updateDocument} from "../firebase/firebase.js";
import {getStoryByTitle, updateStory} from "../lib/db.js";
import MessageModal from "../modals/MessageModal.jsx";

export default function CreateArc() {
    const {storyName} =useParams();
    const[story, setStory] = useState({});
    const[arcs, setArcs] = useState([])
    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const getTheStory = async (storyName) => {
        const storyInfo = await getStoryByTitle(storyName);
        setStory(storyInfo);
        setArcs(storyInfo.arcs);
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

    //const storyObj = JSON.parse(sessionStorage.getItem(storyName));
    //const arrArcs = storyObj.arcs;


    //const story = sessionStorage.getItem(storyName);
    //const jsonStory = JSON.parse(story);
    //const arcListLength = jsonStory.arcs.length;
    //const orderNum = arcListLength +1;

    const saveArc = async ()=>{
        const arcOrderNum = arcs.length +1;

        const newArc = {
            order: arcOrderNum ,
            name: name,
            description: description,
            chapters: []
        }

        //const story = sessionStorage.getItem(storyName);
        //const jsonStory = JSON.parse(story);

        //jsonStory.arcs.push(newArc);
        arcs.push(newArc);
        const updatedStory = {...story, arcs: arcs};
        //sessionStorage.setItem(storyName, JSON.stringify(jsonStory));
        //await updateDocument("stories",jsonStory.id,jsonStory);
        updateStory(updatedStory);

        setModalOpen(true)
        //alert('Arc Saved Successfully.');
    }

    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>
            <h1>Create New Arc</h1>

            <div className='TextContainer'>
                <p>
                    <label>Name </label>
                    <input name="name" type="text" value={name} onChange={onNameChange} required/>
                </p>

                <p>
                    <label>Description </label>
                    <textarea name="description" value={description} onChange={onDescriptionChange} required/>
                </p>

                <h2>Chapters</h2>
                <MessageModal
                    isOpen={modalOpen}
                    onClose={() => {
                        setModalOpen(false)
                        navigate(`/${storyName}/arcs`)
                    }}
                    message="Arc Saved Successfully."
                />
                <ul>

                </ul>
            </div>

            <button onClick={saveArc}>Save Arc</button>
        </>
    )
}