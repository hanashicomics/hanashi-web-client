import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/Arcs.css';

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
            <StoryFooterNavigation storyName={storyName} />
            <h1>Arcs</h1>

            <div className="arcHeader">
                <Link to={`/${storyName}/createarc`} className="linkButton">
                    + Create New Arc
                </Link>
            </div>

            <div className="arcList">
                {
                    arrArcs.length < 1 ? (
                        <p className="noArcs">No arcs found. Create one now!</p>
                    ) : (
                        arrArcs.map((arc, index) => (
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