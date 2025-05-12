import Login from "./Login.jsx";

export default function Profile() {

    return (
        <>
            {
                !sessionStorage.getItem("email") ? <Login /> :
                    <>
                        <h1>Profile</h1>
                        <h2>My Details</h2>
                        <p>Email: {sessionStorage.getItem("email")}</p>
                    </>
            }
        </>
    )
}