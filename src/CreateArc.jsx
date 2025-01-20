import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {useParams} from "react-router-dom";

export default function createArc() {
    const {storyName} =useParams();

    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>
            <h1>Create New Arc</h1>
        </>
    )
}