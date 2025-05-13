import {useParams} from "react-router-dom";
import StoryFooterNavigation from "./StoryFooterNavigation.jsx";
import '../assets/styles/Timeline.css'
import {useEffect, useState} from "react";
export default function Timeline() {
    const {storyName} = useParams();
    const[arcNum, setArcNum] = useState([]);

    const story = JSON.parse(sessionStorage.getItem(storyName));
    const arrArcs = story.arcs;

    useEffect(() => {
        let arrArcOrderNum = [];
        for(let i = 0; i < arrArcs.length; i++){
            arrArcOrderNum.push(arrArcs[i]);
        }
        setArcNum(arrArcOrderNum);

    }, []);


    return(
        <>
            <StoryFooterNavigation storyName={storyName}/>
            <h1>Timeline</h1>

            <div className={'timelineContainer'}>
                    {
                        arrArcs.map((arc, key)=>{
                            return(
                                <div className={'timelineItem'} key={key}>
                                    <div>{arc.name}</div>
                                    <div>{arc.order}</div>
                                    <div>
                                        <label>Order Number</label>
                                        <select>
                                            {
                                                arcNum.map((num, key) => {
                                                    return (
                                                        <option key={key}>{num.order}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            )
                        })
                    }

            </div>
        </>
    )
}