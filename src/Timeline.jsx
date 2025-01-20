import {useParams} from "react-router-dom";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";

export default function Timeline() {
    const {storyName} = useParams();

    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>
            <h1>Timeline</h1>
        </>
    )
}