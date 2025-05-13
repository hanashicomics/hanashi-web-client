import {useState} from "react";
import '../assets/styles/CreateStory.css';
import {useNavigate} from "react-router-dom";
import {saveStoryToFirestore} from "../firebase/firebase.js";

export default function CreateStory() {
    const[title, setTitle] = useState('');
    const[plot, setPlot] = useState('');
    const[genre, setGenre] = useState('');
    const[cover, setCover] = useState('');
    const navigate = useNavigate();

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
        if(sessionStorage.getItem("userid") === null){
            alert("Please login to create a story.");
        }
        else{
            if(title ==='' || plot==='' || cover ==='' || genre===''){
                alert('Please complete all story details.');
            }
            else{
                const story = {
                    title: title,
                    plot: plot,
                    genre: genre,
                    cover: cover,
                    characters: [],
                    arcs: [],
                    timeline:[],
                    locations:[],
                    userid: sessionStorage.getItem("userid")
                }

                const storyJson = JSON.stringify(story);
                alert('Story Saved Successffully.');
                await saveStoryToFb(story);
                alert('Story Saved to FB Successffully.');
                sessionStorage.setItem(story.title, storyJson);

                setTitle('');
                setGenre('');
                setPlot('');
                setCover('');
                navigate('/stories');

            }
        }
    }

    return(
        <>
            <h1>Create Story</h1>
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
                        <input name="title" type="text" value={title} onChange={onTitleChange} required/>
                    </p>

                    <p>
                        <label>Plot</label>
                        <textarea name="plot" value={plot} onChange={onPlotChange} rows={4} required/>
                    </p>

                    <p>
                        <label>Genre</label>
                        <input name="genre" type="text" value={genre} onChange={onGenreChange} required/>
                    </p>

                    <button onClick={saveStory}>Save Story</button>
                </div>
            </div>
        </>
    )
}