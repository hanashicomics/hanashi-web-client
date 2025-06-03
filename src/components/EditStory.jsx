import {useEffect, useState} from "react";
import '../assets/styles/CreateStory.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import StoryFooterNavigation from './StoryFooterNavigation.jsx'
import {syncIDBToFirebasePro, updateDocument} from "../firebase/firebase.js";
import {getStory, getStoryByTitle, updateStory} from "../lib/db.js";
import MessageModal from "../modals/MessageModal.jsx";

export default function EditStory() {
    const {storyName} = useParams();
    const navigate = useNavigate();
    const [story, setStory] = useState({});
    const[title, setTitle] = useState('');
    const[plot, setPlot] = useState('');
    const[genre, setGenre] = useState('');
    const[cover, setCover] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const getTheStory = async (storyName) => {
            setStory(await getStoryByTitle(storyName));
            const storyInfo = await getStoryByTitle(storyName);
            setTitle(storyInfo.title);
            setGenre(storyInfo.genre);
            setPlot(storyInfo.plot);
            setCover(storyInfo.cover);
        }
        getTheStory(storyName);

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

    const
        genreList = ['','Shonen', 'Romance', 'Comedy','Slice of life', 'Horror', 'Thriller','Fantasy', 'Isekai']

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

    const saveStory =  async ()=>{
        if(title ==='' || plot==='' || cover ==='' || genre===''){
            alert('Please complete all story details.');
        }
        else{
            const updatedStory = {
                ...story,
                title: title,
                plot: plot,
                genre: genre,
                cover: cover,
            }

            //const storyJson = JSON.stringify(story);
            await updateStory(updatedStory)
            //sessionStorage.setItem(story.title, storyJson);
            //await updateDocument("stories",story.id,story);
            //sessionStorage.removeItem(storyName);
            await syncIDBToFirebasePro();

            setModalOpen(true);
        }
    }

    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>
            <MessageModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    navigate('/stories');
                }}
                message="Chapter Saved Successfully."
            />
            <h1>Edit Story Info</h1>

            <div className='container'>
                <div className='TextContainer'>
                    <p>
                        <label>Title </label>
                        <input name="title" type="text" value={title} onChange={onTitleChange} required/>
                    </p>

                    <p>
                        <label>Plot </label>
                        <textarea name="plot" value={plot} onChange={onPlotChange} required/>
                    </p>

                    <p>
                        <label>Genre </label>
                        <input name="genre" type="text" value={genre} onChange={onGenreChange} required/>
                    </p>
                </div>


                <div className='imageContainer'>
                    <p>
                        <label>Cover </label>
                        <br/>
                        <img src={cover} width="50%" height="50%"/>
                        <br/>
                        <input name="cover" type="file" onChange={onCoverChange}/>
                    </p>
                </div>
                <p>
                    <button onClick={saveStory} className={"linkButton"}>Save Story</button>
                </p>
                <Link to={`/${storyName}/export`} className="linkButton">
                    Export Story
                </Link>
            </div>


        </>
    )
}