import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../assets/styles/Chapters.css";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import { getStoryByTitle, updateStory } from "../lib/db.js";
import { syncIDBToFirebasePro } from "../firebase/firebase.js";
import MessageModal from "../modals/MessageModal.jsx";

export default function CreateChapter() {
    const { storyName, arcName } = useParams();
    const [story, setStory] = useState({});
    const [arcs, setArcs] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [plot, setPlot] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStory = async () => {
            const storyInfo = await getStoryByTitle(storyName);
            setStory(storyInfo);
            setArcs(storyInfo.arcs);
        };
        fetchStory();
    }, [storyName]);

    const saveChapter = async () => {
        const arcIndex = arcs.findIndex((arc) => arc.name === arcName);
        if (arcIndex === -1) return alert("Arc not found");

        const newChapter = {
            name,
            plot,
            script: convertToRaw(editorState.getCurrentContent()),
        };

        arcs[arcIndex].chapters.push(newChapter);
        const updatedStory = { ...story, arcs };

        await updateStory(updatedStory);
        await syncIDBToFirebasePro();
        setModalOpen(true)
    };

    return (
        <>
            <StoryFooterNavigation storyName={storyName} />
            <h1>Create Chapter</h1>
            <MessageModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    navigate(`/${storyName}/arcs`)
                }}
                message="Chapter Saved Successfully."
            />
            <div className="chapterForm">
                <div className="chapterInputs">
                    <div className="formGroup">
                        <label>Title</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="formGroup">
                        <label>Plot</label>
                        <input
                            type="text"
                            value={plot}
                            onChange={(e) => setPlot(e.target.value)}
                        />
                    </div>

                    <div className="chapterScript">
                        <label>Script</label>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
                                inline: {
                                    inDropdown: false,
                                    options: ['bold', 'italic', 'underline', 'strikethrough'],
                                },
                            }}
                        />
                    </div>
<br/>
                    <button className="task_addbutton" onClick={saveChapter}>
                        Save Chapter
                    </button>
                </div>
            </div>
        </>
    );
}
