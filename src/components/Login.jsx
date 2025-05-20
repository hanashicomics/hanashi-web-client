import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import '../assets/styles/App.css';
import {loginUser} from "../firebase/firebase.js";
import {getSingleUserFromIDB} from "../lib/db.js";

export default function Login() {
    const[userEmail, setUserEmail] = useState("");
    const[userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();
    const[userData, setUserData] = useState({});

    async function getUserData() {
        const userStuff = await getSingleUserFromIDB();
        setUserData(userStuff);
    }

    useEffect(()=>{
        getUserData();
    })

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    }

    const handleFormSubmit = async (event)=>{
        event.preventDefault();
        if(userPassword.length<6){
            alert("Password must be at least 6 characters");
        }
        await loginUser(userEmail,userPassword);
        alert("Login successfully");
        setUserEmail("");
        setUserPassword("");
        navigate("/stories");
    };

    return(
        <>

            <form onSubmit={handleFormSubmit} className={'formArea'}>
                <h1>Login</h1>
                <p>
                    <input type={"email"} onChange={handleEmailChange} value={userEmail} placeholder="Email" required={true} className={'inputText'}/>
                </p>
                <p>
                    <input type={"password"} onChange={handlePasswordChange} value={userPassword} placeholder="Password" required={true} className={'inputText'}/>
                </p>
                <input type={'submit'} value={"Login"} className={"task_addbutton"}/>
                <br/>
                <Link to={'/signup'} className={"LinkButton"}>No Account? Click here to sign up</Link>
            </form>


        </>
    )
}