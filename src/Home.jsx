import "../src/assets/styles/Home.css"
import {Link} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import HomeNavigation from "./components/HomeNavigation.jsx";

export default function Home(){
    return (
        <>
            <HomeNavigation />
            <div className="landing">
                <header className="landing-header">
                    <h1>All Your Stories, Anywhere, Anytime</h1>
                    <p>Capture, build, and organize your stories on the go — whether you&#39;re brainstorming a new world or outlining your next masterpiece.</p>
                    <Link to={"/signup"} className="get-started-button">Get Started</Link>
                </header>

                <section className="features">
                    <div className="feature">
                        <h2>Quick & Easy Story Planning</h2>
                        <p>Write arcs, chapters, characters, and locations — all in one place.</p>
                    </div>
                    <div className="feature">
                        <h2>Work From Anywhere</h2>
                        <p>Responsive design lets you access your stories from any device — phone, tablet, or desktop.</p>
                    </div>
                    <div className="feature">
                        <h2>Stay Organized</h2>
                        <p>Visual timelines, neat exports, and intuitive structure keep your ideas in check.</p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}