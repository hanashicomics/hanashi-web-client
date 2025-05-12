import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";


export default function LoadStory(){
        const navigate = useNavigate();
        const[story,setStory] = useState('');
        const[title, setTitle] = useState('');
        const[plot, setPlot] = useState('');
        const[genre, setGenre] = useState('');
        const[cover, setCover] = useState('');
        const[arcs, setArcs]= useState([]);
        const[characters, setCharacters]= useState([]);
        const[timeline, setTimeline] = useState([]);

    useEffect(() => {
            // const storyInfo = JSON.parse(sessionStorage.getItem(storyName));
            // setTitle(storyInfo.title);
            // setGenre(storyInfo.genre);
            // setPlot(storyInfo.plot);
            // setCover(storyInfo.cover);
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

        const onStoryChange = (e) =>{
            const file = e.target.files[0];

            const fr = new FileReader();

            fr.onloadend = (event)=>{
                const dataJSON = event.target.result;
                const story = JSON.parse(dataJSON);
                setStory(story);
                setTitle(story.title);
                setPlot(story.plot);
                setCover(story.cover);
                setGenre(story.genre);
                setCharacters(story.characters)
                setArcs(story.arcs);
                setTimeline(story.timeline);
            }

            fr.readAsText(file);
        }

        const saveStory =  ()=>{
            if(title ==='' || plot==='' || genre===''){
                alert('Please complete all story details.');
            }
            else{
                const story = {
                    title: title,
                    plot: plot,
                    genre: genre,
                    cover: cover,
                    characters: characters,
                    arcs: arcs,
                    timeline: timeline
                }

                const storyJson = JSON.stringify(story);
                alert('Story Saved Successffully.');

                sessionStorage.setItem(title, storyJson);
                navigate('/stories');
            }
        }

    return (
        <>
            <h1>Load Story from JSON</h1>

            <div className='container'>
                <div className='TextContainer'>
                    <p>
                        <label>Title</label>
                        <input name="title" type="text" value={title} onChange={onTitleChange} required />
                    </p>

                    <p>
                        <label>Plot</label>
                        <textarea name="plot" value={plot} onChange={onPlotChange} required />
                    </p>

                    <p>
                        <label>Genre</label>
                        <input name="genre" type="text" value={genre} onChange={onGenreChange} required />
                    </p>
                </div>

                <div className='imageContainer'>
                    <p>
                        <label>Cover</label>
                        <br />
                        <img src={cover} alt="Story cover" />
                    </p>
                </div>
            </div>

            <div className='container' style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <p>
                    <label>Upload JSON File</label>
                    <input type="file" onChange={onStoryChange} accept=".json"  className={"LinkButton"}/>
                </p>

                <button onClick={saveStory}>Save Story</button>
            </div>
        </>
    );

}