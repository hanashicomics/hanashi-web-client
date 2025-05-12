import {useState} from "react";
import {Link} from "react-router-dom";
import '../assets/styles/App.css';

export default function SignUp() {
    const[userEmail, setUserEmail] = useState("");
    const[userPassword, setUserPassword] = useState("");

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    }

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        if(userPassword.length<6){
            alert("Password must be at least 6 characters");
        }
        setUserEmail("");
        setUserPassword("");

    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className={'formArea'}>
                <p>
                    <input type={"email"} onChange={handleEmailChange} value={userEmail} placeholder="Email" required={true} className={'inputText'}/>
                </p>
                <p>
                    <input type={"password"} onChange={handlePasswordChange} value={userPassword} placeholder="Password" required={true} className={'inputText'}/>
                </p>
                <input type={'submit'} value={"Sign Up"} className={"task_addbutton"}/>
            </form>
            <br/>
            <Link to={'/login'} className={"LinkButton"}>Already have account? Click here to login</Link>
        </>
    )
}