import {useParams} from "react-router-dom";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import '../assets/styles/CreateStory.css';
import {getStoryByTitle} from "../lib/db.js";

export default function ExportStory(){
    const {storyName} = useParams();

    const exportStory = async ()=>{
        const jsonData = JSON.stringify(await getStoryByTitle(storyName));
        const blob = new Blob([jsonData],{type: "application/json"});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${storyName}.json`;
        a.click();

        URL.revokeObjectURL(url);
    }

    return(
        <>
            <button onClick={exportStory} className={"linkButton"}>Export STORY</button>
        </>
    )
}