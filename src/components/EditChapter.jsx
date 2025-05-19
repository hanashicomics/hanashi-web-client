import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {syncIDBToFirebasePro} from "../firebase/firebase.js";
import "../assets/styles/Chapters.css"
import {getStoryByTitle, updateStory} from "../lib/db.js";

export default function EditChapter(){
    const { storyName, arcName, chapterName } = useParams();
    const [story, setStory] = useState({});
    const [name, setName] = useState("");
    const [plot, setPlot] = useState("");
    const [script, setScript] = useState("");
    const[arcs, setArcs] = useState([]);
    const navigate = useNavigate();

    const getTheStory = async (storyName) => {
        const storyInfo = await getStoryByTitle(storyName);
        setStory(storyInfo);
        setArcs(storyInfo.arcs);

        for (let i = 0; i < storyInfo.arcs.length; i++) {
            if (storyInfo.arcs[i].name === arcName) {
                let foundArc = storyInfo.arcs[i];
                for (let j = 0; j < foundArc.chapters.length; j++) {
                    if (foundArc.chapters[j].name === chapterName) {
                        const foundChapter = foundArc.chapters[j];
                        setName(foundChapter.name);
                        setPlot(foundChapter.plot);
                        setScript(foundChapter.script);
                        break;
                    }
                }
                break;
            }
        }
    };

    useEffect(() => {
        getTheStory(storyName);
    },[])

    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onPlotChange = (e) => {
        setPlot(e.target.value);
    };

    const onScriptChange = (e) => {
        setScript(e.target.value);
    };

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
            script: script
        };

        for(let i = 0; i<foundArc.chapters.length; i++){
            if(foundArc.chapters[i].name === chapterName){
                foundArc.chapters[i] = chapter;
            }
        }

        //sessionStorage.setItem(storyName, JSON.stringify(story));
        //await updateDocument("stories",story.id,story);
        const updatedStory = {...story, arcs: arcs};
        await updateStory(updatedStory);
       alert("Chapter saved");
        await syncIDBToFirebasePro();
        navigate(`/${storyName}/arcs/${arcName}/edit`);
    };

    // useEffect(() => {
    //     for(let i = 0; i<arrArcs.length; i++){
    //         if(arrArcs[i].name === arcName){
    //             let foundArc = arrArcs[i];
    //
    //             for(let i = 0; i<foundArc.chapters.length; i++){
    //                 if(foundArc.chapters[i].name === chapterName){
    //                     const foundChapter = foundArc.chapters[i];
    //
    //                     setName(foundChapter.name);
    //                     setPlot(foundChapter.plot);
    //                     setScript(foundChapter.script)
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // }, []);

    return (
        <>
            <StoryFooterNavigation storyName={storyName} />
            <h1>Edit Chapter</h1>

            <div className="chapterForm">
                <div className="chapterInputs">
                    <div className="formGroup">
                        <label>Title</label>
                        <input type="text" value={name} onChange={onNameChange} />
                    </div>

                    <div className="formGroup">
                        <label>Plot</label>
                        <input type="text" value={plot} onChange={onPlotChange} />
                    </div>
                    <div className="chapterScript">
                        <label>Script</label>
                        <textarea
                            value={script}
                            onChange={onScriptChange}
                            rows={15}
                            required
                        />
                    </div>
                    <button className="task_addbutton" onClick={saveChapter}>Save Chapter</button>
                </div>


            </div>
        </>

    );
}