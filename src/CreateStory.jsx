import {useState} from "react";

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

            <p>
                <label>Title </label>
                <input name="title" type="text" value={title} onChange={onTitleChange} required/>
            </p>

            <p>
                <label>Plot </label>
                <input name="plot" type="text" value={plot} onChange={onPlotChange} required/>
            </p>

            <p>
                <label>Genre </label>
                <input name="genre" type="text" value={genre} onChange={onGenreChange} required/>
            </p>

            <p>
                <label>Cover </label>
                <br/>
                <img src={cover} width="100" height="100"/>
                <br/>
                <input name="cover" type="file" onChange={onCoverChange}/>
            </p>

            <p>
                <button onClick={saveStory}>Save Story</button>
            </p>
        </>
    )
}