import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../assets/styles/Chapters.css";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import { getStoryByTitle, updateStory } from "../lib/db.js";
import { syncIDBToFirebasePro } from "../firebase/firebase.js";
import MessageModal from "../modals/MessageModal.jsx";

export default function EditChapter() {
    const { storyName, arcName, chapterName } = useParams();
    const [story, setStory] = useState({});
    const [arcs, setArcs] = useState([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [plot, setPlot] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStory = async () => {
            const storyInfo = await getStoryByTitle(storyName);
            setStory(storyInfo);
            setArcs(storyInfo.arcs);

            const arc = storyInfo.arcs.find(a => a.name === arcName);
            const chapter = arc?.chapters.find(c => c.name === chapterName);

            if (!chapter) return alert("Chapter not found");

            setName(chapter.name);
            setPlot(chapter.plot);

            const contentState = convertFromRaw(chapter.script);
            setEditorState(EditorState.createWithContent(contentState));
        };
        fetchStory();
    }, [storyName, arcName, chapterName]);

    const saveChapter = async () => {
        const arcIndex = arcs.findIndex(arc => arc.name === arcName);
        if (arcIndex === -1) return alert("Arc not found");

        const chapterIndex = arcs[arcIndex].chapters.findIndex(ch => ch.name === chapterName);
        if (chapterIndex === -1) return alert("Chapter not found");

        const updatedChapter = {
            name,
            plot,
            script: convertToRaw(editorState.getCurrentContent()),
        };

        arcs[arcIndex].chapters[chapterIndex] = updatedChapter;

        const updatedStory = { ...story, arcs };
        await updateStory(updatedStory);

        setModalOpen(true)
    };

    return (
        <>
            <StoryFooterNavigation storyName={storyName} />
            <h1>Edit Chapter</h1>
            <MessageModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    navigate(`/${storyName}/arcs/${arcName}/edit`);
                }}
                message="Chapter Saved Successfully."
            />
            <div className="chapterForm">
                <div className="chapterInputs">
                    <div className="formGroup">
                        <label>Title</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="formGroup">
                        <label>Plot</label>
                        <input type="text" value={plot} onChange={(e) => setPlot(e.target.value)} />
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

                    <button className="task_addbutton" onClick={saveChapter}>Save Chapter</button>
                </div>
            </div>
        </>
    );
}
