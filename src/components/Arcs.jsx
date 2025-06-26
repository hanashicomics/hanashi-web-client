import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Arcs.css';
import {getStoryByTitle, updateStory} from "../lib/db.js";
import ConfirmModal from "../modals/ConfirmModal.jsx";
import MessageModal from "../modals/MessageModal.jsx";

export default function Arcs(){
    const {storyName} = useParams();
    const[arcs, setArcs] = useState([]);
    const[arcNameToBeDeleted, setarcNameToBeDeleted] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const[keyTitle, setKeyTitle] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        const updatedArr = arcs.filter(arc => arc.name !== arcNameToBeDeleted);
        setArcs(updatedArr);
        updateStory({
            ...await getStoryByTitle(storyName),
            title: storyName,
            arcs: updatedArr
        })
        setModalOpen(true)
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };
   // const storyObj = JSON.parse(sessionStorage.getItem(storyName));
    //const arrArcs = storyObj.arcs;

    useEffect(() => {
        const getTheStory = async (storyName) => {
            const storyInfo = await getStoryByTitle(storyName);
            const arrArcs = storyInfo.arcs;
            setArcs(arrArcs);
        }
            getTheStory(storyName);
    }, []);

    return(
        <>
            <StoryFooterNavigation storyName={storyName} />
            <h1>Arcs</h1>

            <div className="arcHeader">
                <Link to={`/${storyName}/createarc`} className="linkButton">
                    + Create New Arc
                </Link>
            </div>
            <ConfirmModal
                isOpen={showConfirm}
                message="Are you sure you want to delete this arc? This action cannot be undone.!"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <div className="arcList">
                {
                    arcs.length < 1 ? (
                        <p className="noArcs">No arcs found. Create one now!</p>
                    ) : (
                        arcs.map((arc, index) => (
                            <Link to={`/${storyName}/arcs/${arc.name}/edit`} key={index} className="arcItem">
                                <div className="arcCard">
                                    <h4>{arc.name}</h4>
                                </div>
                                <button
                                    className="delete-btn"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        setarcNameToBeDeleted(arc.name);
                                        handleDelete();
                                    }}
                                >
                                    Delete
                                </button>
                            </Link>

                        ))
                    )
                }
            </div>
        </>
    )
}