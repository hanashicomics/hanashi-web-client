import {useParams} from "react-router-dom";
import StoryNavigation from "./StoryNavigation.jsx";
import RootNavigation from "./RootNavigation.jsx";

export default function ExportStory(){
    const {storyName} = useParams();

    const exportStory = ()=>{
        const jsonData = sessionStorage.getItem(storyName);
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
            <RootNavigation />
            <StoryNavigation storyName={storyName}/>
            <p>Export Story</p>
            <button onClick={exportStory}>Export STORY</button>
        </>
    )
}