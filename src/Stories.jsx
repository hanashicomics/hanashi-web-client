import {Link} from "react-router-dom";

export default function Stories(){

    return(
        <>
            <div className="createStoryLine">
                <h1>Stories</h1>
                <Link to={'/createstory'}> Create a story +</Link>
            </div>

            <div className="myStories">

            </div>
        </>
    )
}