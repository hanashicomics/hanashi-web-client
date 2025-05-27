import "../assets/styles/Pricing.css"
import {Link} from "react-router-dom";

export default function Pricing() {
    return (
        <div className="pricing-container">
            <h1 className="pricing-title">Choose Your Plan</h1>

            <div className="pricing-grid">
                <div className="pricing-card">
                    <h2 className="pricing-title-plan">Free</h2>
                    <p className="pricing-desc">Perfect for offline use and local storage.</p>
                    <ul className="pricing-list">
                        <li>Create and store stories locally ✅</li>
                        <li>Offline access ✅</li>
                        <li>Cloud backup 🚫</li>
                        <li>Sync across devices 🚫</li>
                    </ul>
                    <div className="pricing-price pricing-price-free">R0</div>
                    <Link to={"/signup"} className="pricing-button">Use for free</Link>
                </div>

                <div className="pricing-card pro">
                    <h2 className="pricing-title-plan">Pro</h2>
                    <p className="pricing-desc">Unlock cloud features and device syncing.</p>
                    <ul className="pricing-list">
                        <li>Create and store stories locally ✅</li>
                        <li>Offline access ✅</li>
                        <li>Cloud backup ✅</li>
                        <li>Sync across devices ✅</li>
                    </ul>
                    <div className="pricing-price">R49 / month</div>
                    <Link to={"/upgrade"} className="pricing-button">Go Pro</Link>
                </div>
            </div>

            <p className="pricing-footer">
                You can continue using the free version offline without limits.
            </p>
        </div>
    );
}
