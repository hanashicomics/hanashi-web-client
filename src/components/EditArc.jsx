import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Arcs.css';
import {syncIDBToFirebasePro, updateDocument} from "../firebase/firebase.js";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {getStoryByTitle, updateStory} from "../lib/db.js";
import MessageModal from "../modals/MessageModal.jsx";
import ConfirmModal from "../modals/ConfirmModal.jsx";

export default function EditArc(){
    const {storyName} =useParams();
    const{arcName} = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const navigate = useNavigate();
    const[story,setStory] = useState({});
    const[chapters, setChapters] = useState([]);
    const[arcs, setArcs] = useState([]);

    const[chapterNameToBeDeleted, setchapterNameToBeDeleted] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const[keyTitle, setKeyTitle] = useState({});

    const getTheStory = async (storyName) => {
        const storyInfo = await getStoryByTitle(storyName);
        setStory(storyInfo);
        setArcs(storyInfo.arcs);

        for(let i = 0; i<storyInfo.arcs.length; i++){
            if(storyInfo.arcs[i].name === arcName){
                let foundArc = storyInfo.arcs[i];
                setChapters(foundArc.chapters);
                setName(foundArc.name);
                setDescription(foundArc.description);
                return;
            }
        }
    };

    useEffect(() => {
        getTheStory(storyName);
    },[])

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        const updatedChapters = chapters.filter(chapter => chapter.name !== chapterNameToBeDeleted);
        setChapters(updatedChapters);

        // Update the chapters for the correct arc
        const updatedArcs = arcs.map(arc =>
            arc.name === arcName
                ? { ...arc, chapters: updatedChapters }
                : arc
        );

        await updateStory({
            ...story,
            arcs: updatedArcs
        });

        alert("Chapter Deleted Successfully");
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    const saveArc =async  ()=>{
        const newArc = {
            name: name,
            description: description,
            chapters: []
        }

        for(let i = 0; i<arcs.length; i++){
            if(arcs[i].name === arcName){
                arcs[i] = newArc;
                break;
            }
        }
        const updatedStory = {...story, arcs: arcs};
        await updateStory(updatedStory);
        await syncIDBToFirebasePro();

        setModalOpen(true)
    }
    return(
        <>
            <StoryFooterNavigation storyName={storyName} />
            <h1>Edit Arc</h1>
            <MessageModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    navigate(`/${storyName}/arcs`)
                }}
                message="Arc Edited Successfully."
            />
            <ConfirmModal
                isOpen={showConfirm}
                message="Are you sure you want to delete this arc? This action cannot be undone.!"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <div className='TextContainer'>
                <p>
                    <label>Name </label>
                    <input name="name" type="text" value={name} onChange={onNameChange} required/>
                </p>

                <p>
                    <label>Description </label>
                    <textarea name="description" value={description} onChange={onDescriptionChange} required/>
                </p>

                <div className="chaptersSection">
                    <div className="chaptersHeader">
                        <h2>Chapters</h2>
                        <Link to={`/${storyName}/arcs/${name}/createchapter`} className="linkButton">
                            + Create New Chapter
                        </Link>
                    </div>

                    {chapters.length === 0 ? (
                        <p className="noChapters">No chapters yet. Start writing!</p>
                    ) : (
                        <ul className="chapterList">
                            {chapters.map((chapter, key) => (
                                <li key={key} className="chapterItem">
                                    <Link to={`/${storyName}/arcs/${arcName}/chapter/${chapter.name}`}>
                                        {chapter.name}
                                        <button
                                            className="delete-btn"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                setchapterNameToBeDeleted(chapter.name);
                                                handleDelete();
                                            }}>
                                            Delete
                                        </button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>

            <button onClick={saveArc}>Save Arc</button>
        </>
    )
}