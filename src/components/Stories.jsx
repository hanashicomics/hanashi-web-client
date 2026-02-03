import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Stories.css';
import {deleteDocument, getDocumentsByField, syncIDBToFirebasePro, syncFirebaseToIDB} from "../firebase/firebase.js";
import {deleteStory, getAllStories, getSingleUserFromIDB} from "../lib/db.js";
import ConfirmModal from "../modals/ConfirmModal.jsx";
import MessageModal from "../modals/MessageModal.jsx";

export default function Stories(){
    const[storyArr, setStoryArr] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const[keyTitle, setKeyTitle] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
   const handleDelete = () => {
        setShowConfirm(true);
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        await handleIdbDelete(keyTitle.id,keyTitle.title);
        setModalOpen(true)
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

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
            await syncFirebaseToIDB();
            await handleIDBStories();
        };

        getStories();
    }, []);

    const handleIdbDelete = async (key,title)=>{
            await deleteStory(key);
            const updatedArr = storyArr.filter(story => story.title !== title);
            setStoryArr(updatedArr);
    }

    return (
        <>
            <ConfirmModal
                isOpen={showConfirm}
                message="Are you sure you want to delete this story? This action cannot be undone.!"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <MessageModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    window.location.reload();
                }}
                message="Story Deleted Successfully."
            />

            <div className="cards-grid">


            <div className="createStoryLine">
                <h1>Stories</h1>
                <Link to={'/createstory'} className={"LinkButton"}> Create a story +</Link>
                {/*<Link to={'/loadstory'} className={"LinkButton"}> Load a story from JSON +</Link>*/}
            </div>

            <br />
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
                                        //await handleIdbDelete(story.id,story.title);
                                        setKeyTitle({
                                            id: story.id,
                                            key: story.key,
                                            title: story.title
                                        })
                                        handleDelete();
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
