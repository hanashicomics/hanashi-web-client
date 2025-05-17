import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Arcs.css';
import {getStoryByTitle} from "../lib/db.js";

export default function Arcs(){
    const {storyName} = useParams();
    const[arcs, setArcs] = useState([]);

   // const storyObj = JSON.parse(sessionStorage.getItem(storyName));
    //const arrArcs = storyObj.arcs;

    useEffect(() => {
        const getTheStory = async (storyName) => {
            const storyInfo = await getStoryByTitle(storyName);
            const arrArcs = storyInfo.arcs;
            setArcs(arrArcs);
        }
            getTheStory(storyName);
    }, []);

    return(
        <>
            <StoryFooterNavigation storyName={storyName} />
            <h1>Arcs</h1>

            <div className="arcHeader">
                <Link to={`/${storyName}/createarc`} className="linkButton">
                    + Create New Arc
                </Link>
            </div>

            <div className="arcList">
                {
                    arcs.length < 1 ? (
                        <p className="noArcs">No arcs found. Create one now!</p>
                    ) : (
                        arcs.map((arc, index) => (
                            <Link to={`/${storyName}/arcs/${arc.name}/edit`} key={index} className="arcItem">
                                <div className="arcCard">
                                    <h4>{arc.name}</h4>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>
        </>
    )
}