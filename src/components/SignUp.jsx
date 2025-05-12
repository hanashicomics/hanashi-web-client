import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../assets/styles/App.css';
import {signUpUser} from "../firebase/firebase.js";

export default function SignUp() {
    const[userEmail, setUserEmail] = useState("");
    const[userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

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
        await signUpUser(userEmail,userPassword);
        alert("Signup successfully to FB");
        setUserEmail("");
        setUserPassword("");
        navigate('/login');
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className={'formArea'}>
                <h1>Signup</h1>
                <p>
                    <input type={"email"} onChange={handleEmailChange} value={userEmail} placeholder="Email" required={true} className={'inputText'}/>
                </p>
                <p>
                    <input type={"password"} onChange={handlePasswordChange} value={userPassword} placeholder="Password" required={true} className={'inputText'}/>
                </p>
                <input type={'submit'} value={"Sign Up"} className={"task_addbutton"}/>
                <br/>
                <Link to={'/login'} className={"LinkButton"}>Already have an account? Click here to login</Link>
            </form>
        </>
    )
}