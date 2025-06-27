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
    const [duplicatemodalOpen, setduplicateModalOpen] = useState(false);

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

    const saveArc = async ()=>{
        const arcOrderNum = arcs.length +1;

        const newArc = {
            order: arcOrderNum ,
            name: name,
            description: description,
            chapters: []
        }

        const duplicate = arcs.some((arc) => arc.name === name);
        if (duplicate) {
            setduplicateModalOpen(true);
            return;
        }
        arcs.push(newArc);
        const updatedStory = {...story, arcs: arcs};
        updateStory(updatedStory);
        setModalOpen(true)
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
                <MessageModal
                    isOpen={duplicatemodalOpen}
                    onClose={() => {
                        setduplicateModalOpen(false)
                    }}
                    message="Arc with this title already exists. Please choose a different title."
                />
                <ul>

                </ul>
            </div>

            <button onClick={saveArc}>Save Arc</button>
        </>
    )
}