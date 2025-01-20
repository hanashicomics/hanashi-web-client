import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {Link, useParams} from "react-router-dom";

export default function Arcs(){
    const {storyName} = useParams();

    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>
            <h1>Arcs</h1>
                <Link to={`/${storyName}/createarc`}> Create new arc +</Link>
        </>
    )
}