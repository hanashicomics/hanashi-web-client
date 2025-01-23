import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './assets/styles/Arcs.css';

export default function Arcs(){
    const {storyName} = useParams();
    const[arcs, setArcs] = useState([]);

    const storyObj = JSON.parse(sessionStorage.getItem(storyName));
    const arrArcs = storyObj.arcs;

    useEffect(() => {
            setArcs(arrArcs);
    }, []);

    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>
            <h1>Arcs</h1>
            <Link to={`/${storyName}/createarc`}> Create new arc +</Link>

                {
                    arrArcs.length <1 ? (<div>No Arcs found. Create one now!</div>):

                    arrArcs.map((arc, index)=>{
                        return (
                            <Link to={`/${storyName}/arcs/${arc.name}/edit`} key={index}>
                                <div className={'arc'}>
                                    <h4>{arc.name}</h4>
                                </div>
                            </Link>
                        )
                    })
                }

        </>
    )
}