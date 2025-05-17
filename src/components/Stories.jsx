import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Stories.css';
import {deleteDocument, getDocumentsByField} from "../firebase/firebase.js";
import {deleteStory, getAllStories, getSingleUserFromIDB} from "../lib/db.js";

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

    const handleIDBStories = async () => {
        const userStuff = await getSingleUserFromIDB();
        const uid = userStuff.uid;
        const stories = await getAllStories();
        const newstories = [];
        for(let i=0;i<stories.length;i++){
            if(stories[i].userid === uid){
                newstories.push(stories[i]);
            }

        }
        setStoryArr(newstories);
    }

    useEffect(() => {
        const getStories = async () => {
            // await handlefbStories(); // Load and store stories from Firebase into sessionStorage
            //
            // // Retrieve stories from sessionStorage
            // const stories = [];
            // Object.keys(sessionStorage).forEach((key) => {
            //     if (key === "userid" || key === "email") return;
            //     const storyItem = sessionStorage.getItem(key);
            //     stories.push(JSON.parse(storyItem)); // Parse JSON string into an object
            // });

            //setStoryArr(stories); // Update the state
            await handleIDBStories();
        };

        getStories();
    }, []);

    const handleDelete = async (id,storytitle) => {
        if (confirm("Are you sure you want to delete this story?")) {
            await deleteDocument("stories", id);
            alert("Story deleted from fb successfully.");
            const updatedArr = storyArr.filter(story => story.title !== storytitle);
            setStoryArr(updatedArr);
            sessionStorage.removeItem(storytitle);
        } else {
            console.log("Deletion cancelled");
        }
    }

    const handleIdbDelete = async (key,title)=>{

        if (confirm("Are you sure you want to delete this story?")) {
            await deleteStory(key);
            alert("Story deleted from fb successfully.");
            const updatedArr = storyArr.filter(story => story.title !== title);
            setStoryArr(updatedArr);
        } else {
            console.log("Deletion cancelled");
        }
    }

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
                        <Link to={`/${story.title}/info`} key={key} className="card-link">
                            <div className="card">
                                <img src={story.cover} alt="Cover Title" className="card-img" />
                                <div className="card-text">
                                    <h3 className="card-title">{story.title}</h3>
                                </div>
                                <button
                                    className="delete-btn"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        await handleIdbDelete(story.id,story.title);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </Link>

                    ))
                }
            </div>
        </>
    );
}
