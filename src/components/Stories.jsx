import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Stories.css';
import {getDocumentsByField} from "../firebase/firebase.js";

export default function Stories(){
    const[storyArr, setStoryArr] = useState([]);

    const handlefbStories = async () => {
        const stories = await getDocumentsByField("stories","userid", sessionStorage.getItem("userid"));
        stories.forEach((story) => {
            if(sessionStorage.getItem(story.title) != null){
                console.log("story already exists");
            }
            sessionStorage.setItem(story.title, JSON.stringify(story)); // Save directly to sessionStorage
        });
        console.log("stopries loaded");
    }

    useEffect(() => {
        const getStories = async () => {
            await handlefbStories(); // Load and store stories from Firebase into sessionStorage

            // Retrieve stories from sessionStorage
            const stories = [];
            Object.keys(sessionStorage).forEach((key) => {
                if (key === "userid" || key === "email") return;
                const storyItem = sessionStorage.getItem(key);
                stories.push(JSON.parse(storyItem)); // Parse JSON string into an object
            });

            setStoryArr(stories); // Update the state
        };

        getStories();
    }, []);

    return (
        <>
            <div className="createStoryLine">
                <h1>Stories</h1>
                <Link to={'/createstory'} className={"LinkButton"}> Create a story +</Link>
                <Link to={'/loadstory'} className={"LinkButton"}> Load a story from JSON +</Link>
            </div>

            <br />

            <div className="cards-grid">
                {storyArr.length < 1 ? <div>No stories found. Create one now!</div> :
                    storyArr.map((story, key) => (
                        <Link to={`/${story.title}/info`} key={key}>
                            <div className="card">
                                <img src={story.cover} alt="Cover Title" className="card-img" />
                                <div className="card-text">
                                    <h3 className="card-title">{story.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    );
}
