import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function createArc() {
    const {storyName} =useParams();

    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const navigate = useNavigate();

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const storyObj = JSON.parse(sessionStorage.getItem(storyName));
    const arrArcs = storyObj.arcs;

    useEffect(() => {
        console.log(arrArcs);
    }, []);


    const story = sessionStorage.getItem(storyName);
    const jsonStory = JSON.parse(story);
    const arcListLength = jsonStory.arcs.length;
    const orderNum = arcListLength +1;

    const saveArc = ()=>{
        const newArc = {
            order: orderNum ,
            name: name,
            description: description,
            chapters: []
        }

        const story = sessionStorage.getItem(storyName);
        const jsonStory = JSON.parse(story);

        jsonStory.arcs.push(newArc);
        console.log(jsonStory);
        sessionStorage.setItem(storyName, JSON.stringify(jsonStory));
        alert('Arc Saved Successfully.');
        navigate(`/${storyName}/arcs`)

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
                <ul>

                </ul>
            </div>

            <button onClick={saveArc}>Save Arc</button>
        </>
    )
}