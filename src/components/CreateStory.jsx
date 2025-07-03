import {useEffect, useState} from "react";
import '../assets/styles/CreateStory.css';
import {useNavigate} from "react-router-dom";
import {saveStoryToFirestore, syncIDBToFirebasePro} from "../firebase/firebase.js";
import {addStory, getAllStories, getSingleUserFromIDB} from "../lib/db.js";
import MessageModal from "../modals/MessageModal.jsx";

export default function CreateStory() {
    const[title, setTitle] = useState('');
    const[plot, setPlot] = useState('');
    const[genre, setGenre] = useState('');
    const[cover, setCover] = useState('');
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [duplicatemodalOpen, setduplicateModalOpen] = useState(false);
    const[storyArr, setStoryArr] = useState([]);

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
            //await syncIDBToFirebasePro();
            //setStoryArr(stories); // Update the state
            await handleIDBStories();
        };

        getStories();
    }, []);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const onPlotChange = (e) => {
        setPlot(e.target.value);
    }

    const onGenreChange = (e) => {
        setGenre(e.target.value);
    }

    const genreList = ['','Shonen', 'Romance', 'Comedy','Slice of life', 'Horror', 'Thriller','Fantasy', 'Isekai']

    const onCoverChange = (e) => {
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = ()=>{
                const cover64 = reader.result;
                setCover(cover64);
            }
        }
        else{
            alert("Error selecting image. Please select an image.");
        }
    }

    const saveStoryToFb = async (storydata)=>{
        await saveStoryToFirestore(storydata);
    }

    const saveStory =  async ()=>{
        const userStuff = await getSingleUserFromIDB();
        const uid = userStuff.uid;

        if(uid === null){
            alert("Please login to create a story.");
        }
        else{
            if(title ===''){
                alert('Add a title to your story.');
            }
            else{
                const story = {
                    title: title,
                    plot: plot,
                    genre: genre,
                    cover: cover,
                    characters: [],
                    arcs: [],
                    locations:[],
                    userid: uid
                }

                const duplicate = storyArr.some((storyToBeSaved) => story.title === storyToBeSaved.title);
                if (duplicate) {
                    setduplicateModalOpen(true);
                    return;
                }

                const storyJson = JSON.stringify(story);
                await addStory(story);

                setTitle('');
                setGenre('');
                setPlot('');
                setCover('');

                setModalOpen(true)
            }
        }
    }

    return(
        <>
            <h1>Create Story</h1>
            <MessageModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    navigate('/stories')
                }}
                message="Story Saved Successfully."
            />
            <MessageModal
                isOpen={duplicatemodalOpen}
                onClose={() => {
                    setduplicateModalOpen(false)
                }}
                message="Story with this title already exists. Please choose a different title."
            />
            <div className='container'>
                <div className='imageContainer'>
                    <p>
                        <label>Cover</label>
                        <img src={cover} alt="cover preview"/>
                        <br/>
                        <input name="cover" type="file" onChange={onCoverChange} placeholder="Add a cover image"/>
                    </p>
                </div>

                <div className='TextContainer'>
                    <p>
                        <label>Title</label>
                        <input name="title" type="text" value={title} onChange={onTitleChange} />
                    </p>

                    <p>
                        <label>Plot</label>
                        <textarea name="plot" value={plot} onChange={onPlotChange} rows={4} />
                    </p>

                    <p>
                        <label>Genre</label>
                        <input name="genre" type="text" value={genre} onChange={onGenreChange} />
                    </p>

                    <button onClick={saveStory}>Save Story</button>
                </div>
            </div>
        </>
    )
}