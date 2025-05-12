import Login from "./Login.jsx";

export default function Profile() {

    return (
        <>
            <h1>Profile</h1>
            {
                !sessionStorage.getItem("email") ? <Login /> :
                    <>
                        <h2>My Details</h2>
                    </>
            }
        </>
    )
}