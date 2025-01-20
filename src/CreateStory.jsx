import {useState} from "react";
import './assets/styles/CreateStory.css';

export default function CreateStory() {
    const[title, setTitle] = useState('');
    const[plot, setPlot] = useState('');
    const[genre, setGenre] = useState('');
    const[cover, setCover] = useState('');

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

    const saveStory =  ()=>{
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
                timeline:[]
            }

            const storyJson = JSON.stringify(story);
            console.log(storyJson);
            alert('Story Saved Successffully.');

            sessionStorage.setItem(story.title, storyJson);

            setTitle('');
            setGenre('');
            setPlot('');
            setCover('');
        }
    }

    return(
        <>
            <h1>Create Story</h1>

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
            </div>


            <p>
                <button onClick={saveStory}>Save Story</button>
            </p>
        </>
    )
}