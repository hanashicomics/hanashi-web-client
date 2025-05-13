import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Arcs.css';
import {updateDocument} from "../firebase/firebase.js";
import StoryNavigation from "./StoryNavigation.jsx";
import RootNavigation from "./RootNavigation.jsx";

export default function EditArc(){
    const {storyName} =useParams();
    const{arcName} = useParams();

    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const navigate = useNavigate();

    const[chapters, setChapters] = useState([]);

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const storyObj = JSON.parse(sessionStorage.getItem(storyName));
    const arrArcs = storyObj.arcs;

    useEffect(() => {
        for(let i = 0; i<arrArcs.length; i++){
            if(arrArcs[i].name === arcName){
                let foundArc = arrArcs[i];
                setChapters(foundArc.chapters);
                setName(foundArc.name);
                setDescription(foundArc.description);
                return;
            }
        }
    }, []);

    const saveArc =async  ()=>{
        const newArc = {
            name: name,
            description: description,
            chapters: []
        }

        const story = sessionStorage.getItem(storyName);
        const jsonStory = JSON.parse(story);
        jsonStory.arcs.push(newArc);

        sessionStorage.setItem(storyName, JSON.stringify(jsonStory));
        await updateDocument("stories",jsonStory.id,jsonStory);

        alert('Arc Saved Successfully.');
        navigate(`/${storyName}/arcs`)

    }
    return(
        <>
            <RootNavigation />
            <StoryNavigation storyName={storyName} />
            <h1>Edit Arc</h1>
            <div className='TextContainer'>
                <p>
                    <label>Name </label>
                    <input name="name" type="text" value={name} onChange={onNameChange} required/>
                </p>

                <p>
                    <label>Description </label>
                    <textarea name="description" value={description} onChange={onDescriptionChange} required/>
                </p>

                <div className="chaptersSection">
                    <div className="chaptersHeader">
                        <h2>Chapters</h2>
                        <Link to={`/${storyName}/arcs/${name}/createchapter`} className="linkButton">
                            + Create New Chapter
                        </Link>
                    </div>

                    {chapters.length === 0 ? (
                        <p className="noChapters">No chapters yet. Start writing!</p>
                    ) : (
                        <ul className="chapterList">
                            {chapters.map((chapter, key) => (
                                <li key={key} className="chapterItem">
                                    <Link to={`/${storyName}/arcs/${arcName}/chapter/${chapter.name}`}>
                                        {chapter.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>

            <button onClick={saveArc}>Save Arc</button>
        </>
    )
}