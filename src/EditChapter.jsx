import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";

export default function EditChapter(){
    const { storyName, arcName, chapterName } = useParams();

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

    const story = JSON.parse(sessionStorage.getItem(storyName));
    const arrArcs = story.arcs;

    const saveChapter = () => {
        let foundArc;
        for(let i = 0; i<arrArcs.length; i++){
            if(arrArcs[i].name === arcName){
                foundArc = arrArcs[i];
                break;
            }
        }
        const chapter = {
            name: name,
            plot: plot,
            script: script
        };

        foundArc.chapters.push(chapter);

        sessionStorage.setItem(storyName, JSON.stringify(story));
        console.log(story);

        console.log("Chapter saved:", chapter);
    };

    useEffect(() => {
        for(let i = 0; i<arrArcs.length; i++){
            if(arrArcs[i].name === arcName){
                let foundArc = arrArcs[i];

                for(let i = 0; i<foundArc.chapters.length; i++){
                    if(foundArc.chapters[i].name === chapterName){
                        const foundChapter = foundArc.chapters[i];

                        setName(foundChapter.name);
                        setPlot(foundChapter.plot);
                        setScript(foundChapter.script)
                        break;
                    }
                }
            }
        }
    }, []);

    return (
        <>
            <StoryFooterNavigation storyName={storyName} />
            <h1>Edit Chapter</h1>

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