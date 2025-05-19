import {useNavigate, useParams} from "react-router-dom";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {useEffect, useState} from "react";
import {syncIDBToFirebasePro} from "../firebase/firebase.js";
import {getStoryByTitle, updateStory} from "../lib/db.js";

export default function CreateChapter() {
    const { storyName, arcName } = useParams();
    const[story, setStory] = useState({});
    const[arcs, setArcs] = useState([]);
    const navigate = useNavigate();
    const getTheStory = async (storyName) => {
        const storyInfo = await getStoryByTitle(storyName);
        setStory(storyInfo);
        setArcs(storyInfo.arcs);
    };
    const [name, setName] = useState("");
    const [plot, setPlot] = useState("");
    const [script, setScript] = useState("");

    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onPlotChange = (e) => {
        setPlot(e.target.value);
    };

    const onScriptChange = (e) => {
        setScript(e.target.value);
    };

    //const story = JSON.parse(sessionStorage.getItem(storyName));
   // const arrArcs = story.arcs;

    const saveChapter = async () => {
        let foundArc;
        for(let i = 0; i<arcs.length; i++){
            if(arcs[i].name === arcName){
                foundArc = arcs[i];
                break;
            }
        }
        const chapter = {
            name: name,
            plot: plot,
            script: script,
        };

        foundArc.chapters.push(chapter);
        const updatedStory = {...story, arcs: arcs};
        //sessionStorage.setItem(storyName, JSON.stringify(story));
        //await updateDocument("stories",story.id,story);
        await updateStory(updatedStory);
        alert("Chapter saved successfully.");
        await syncIDBToFirebasePro();
        navigate(`/${storyName}/arcs`);
        setName("");
        setPlot("");
        setScript("");
    };

    useEffect(() => {
        getTheStory(storyName);
    },[])

    return (
        <>
            <StoryFooterNavigation storyName={storyName} />
            <h1>Create Chapter</h1>

            <p>
                <label>Title </label>
                <input type="text" value={name} onChange={onNameChange} />
            </p>

            <p>
                <label>Plot </label>
                <input type="text" value={plot} onChange={onPlotChange} />
            </p>

                <h3>Script </h3>
                <textarea value={script} onChange={onScriptChange} required/>

            <p>
                <button onClick={saveChapter}>Save Chapter</button>
            </p>
        </>
    );
}
