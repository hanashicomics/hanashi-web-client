import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import './assets/styles/Stories.css';

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
                <Link to={'/createstory'}> Create a story +</Link>
                <Link to={'/loadstory'}> Load a story from JSON +</Link>
            </div>

            <br/>

            <div className="myStories">
                {

                    storyArr.map((story,key)=>{
                        const storyJson = JSON.parse(story);
                        return(
                            <>
                                    <div className='StoryCard' key={key}>
                                        <img src={storyJson.cover} width={'200'} height={'300'} className='StoryCover' />
                                        <h4 className='StoryTitle' >{storyJson.title}</h4>

                                        <Link to={`/${storyJson.title}/info`}>
                                            <button className='StoryButton'>Edit</button>
                                        </Link>
                                    </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}