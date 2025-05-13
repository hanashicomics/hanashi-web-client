import "../assets/styles/Footer.css"
import {Link} from "react-router-dom";

export default function Footer() {
    return(
        <>
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} Hanashi. All rights reserved.</p>

                    <nav className="footer-links">
                        <Link to="/about">About</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                    </nav>

                    <div className="footer-socials">
                        <a href="https://twitter.com/hanashi" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://facebook.com/hanashi" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://instagram.com/hanashi" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://github.com/hanashi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <i className="icons"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}