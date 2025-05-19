import '../assets/styles/Upgrade.css';
import { Link } from 'react-router-dom';

export default function Upgrade() {
    return (
        <div className="upgrade-container">
            <h1 className="upgrade-title">Upgrade to Pro</h1>
            <p className="upgrade-subtitle">
                Unlock full online access, cloud backup, and more.
            </p>

            <div className="upgrade-features">
                <ul>
                    <li>✅ Cloud backup of your stories</li>
                    <li>✅ Sync across devices</li>
                    <li>✅ Priority support</li>
                    <li>✅ Continued offline access</li>
                </ul>
            </div>

            <div className="upgrade-price-box">
                <p className="upgrade-price">R49 / month</p>
                <Link to="/pay" className="upgrade-button">Continue to Payment</Link>
            </div>

            <p className="upgrade-note">
                You can continue using Hanashi for free with offline features.
            </p>
        </div>
    );
}
