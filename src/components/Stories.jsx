import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Stories.css';

export default function Stories(){
    const[storyArr, setStoryArr] = useState([]);

    useEffect(() => {
        const getStories = ()=>{
            const stories = [];
            Object.keys(sessionStorage).forEach((key) =>{
                const storyItem = sessionStorage.getItem(key);
                stories.push(storyItem);
            })
            setStoryArr(stories);
        };


        getStories();
    }, []);


    const getStoryKey = (key)=>{

    }

    return(
        <>
            <div className="createStoryLine">
                <h1>Stories</h1>
                <Link to={'/createstory'} className={"LinkButton"}> Create a story +</Link>
                <Link to={'/loadstory'} className={"LinkButton"}> Load a story from JSON +</Link>
            </div>

            <br/>


                <div className="cards-grid">
                {
                    storyArr.length < 1 ? <div>No stories found. Create one now!</div> :

                        // storyArr.map((story, key) => {
                        //     const storyJson = JSON.parse(story);
                        //     return (
                        //         <Link to={`/${storyJson.title}/info`} key={key}>
                        //             <div className='StoryCard'>
                        //                 <img src={storyJson.cover} className='StoryCover' alt={"story cover"}/>
                        //                 <h4 className='StoryTitle'>{storyJson.title}</h4>
                        //             </div>
                        //         </Link>
                        //     )
                        // })

                    storyArr.map((story, key) => {
                    const storyJson = JSON.parse(story);
                    return (
                        <Link to={`/${storyJson.title}/info`} key={key}>
                                <Link to={`/${storyJson.title}/info`} key={key}>
                                    <div className="card">
                                        <img src={storyJson.cover} alt="Cover Title" className="card-img"/>
                                        <div className="card-text">
                                            <h3 className="card-title">{storyJson.title}</h3>
                                        </div>
                                    </div>
                                </Link>

                        </Link>
                    )
            })
                }
                </div>

        </>
    )
}