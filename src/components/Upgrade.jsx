import '../assets/styles/Upgrade.css';
import { Link } from 'react-router-dom';
import {getSingleUserFromIDB} from "../lib/db.js";
import {useEffect, useState} from "react";

export default function Upgrade() {
    const[email, setEmail] = useState("");
    const[uid, setUid] = useState("");

    async function getUserData() {
        const userStuff = await getSingleUserFromIDB();
        setEmail(userStuff.email);
        setUid(userStuff.uid);

        console.log("Email:", email);
        console.log("UID:", uid);
    }

    useEffect(() => {
        getUserData();
    },[])

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

            {/*<div className="upgrade-price-box">*/}
            {/*    <p className="upgrade-price">R49 / month</p>*/}
            {/*    <p className="pricing-desc">Pro does not support recurring purchases,and as such requires manual monthly payments to continue using Pro features.</p>*/}
            {/*    <Link to="/pay" className="upgrade-button">Continue to Payment</Link>*/}
            {/*</div>*/}

            <div className="upgrade-price-box">
                <p className="upgrade-price">R5 / month</p>
                <p className="pricing-desc">Pro does not support recurring purchases,and as such requires manual monthly
                    payments to continue using Pro features.</p>
                <p className="pricing-desc">You will be directed to an external payment portal to complete your
                    purchase</p>

 {/*               <form name="PayFastPayNowForm" action="https://payment.payfast.io/eng/process" method="post">*/}
 {/*                   <input type="hidden" name="custom_str1" value="FIREBASE_UID" />*/}
 {/*                   <input required type="hidden" name="cmd" value="_paynow"/>*/}
 {/*                   <input required type="hidden" name="receiver" pattern="[0-9]" value="30104223"/>*/}
 {/*                   <input type="hidden" name="return_url" value="https://hanashi.website/profile"/>*/}
 {/*                   <input type="hidden" name="cancel_url" value="https://hanashi.website/pricing"/>*/}
 {/*                   <input type="hidden" name="notify_url" value="https://hanashi-node.onrender.com/notify"/>*/}
 {/*                   <input required type="hidden" name="amount" value="5"/>*/}
 {/*                   <input required type="hidden" name="item_name" maxLength="255" value="Hanashi Pro 1 Month"/>*/}
 {/*                   <input type="hidden" name="item_description" maxLength="255" value="With Hanashi Pro, you can save*/}
 {/*and sync all your stories across devices to enhance your creative experience."/>*/}
 {/*                   <table>*/}
 {/*                       <tbody>*/}
 {/*                       <tr>*/}
 {/*                           <td colSpan={2} style={{textAlign: "center"}}>*/}
 {/*                               <input*/}
 {/*                                   type="image"*/}
 {/*                                   src="https://my.payfast.io/images/buttons/PayNow/Primary-Large-PayNow.png"*/}
 {/*                                   alt="Pay Now"*/}
 {/*                                   title="Pay Now with Payfast"*/}
 {/*                               />*/}
 {/*                           </td>*/}
 {/*                       </tr>*/}
 {/*                       </tbody>*/}
 {/*                   </table>*/}
 {/*               </form>*/}

                <form action="https://sandbox.payfast.co.za/eng/process" method="post">
                    <input type="hidden" name="merchant_id" value="10039376"/>
                    <input type="hidden" name="merchant_key" value="1055i11vkwz9r"/>
                    <input type="hidden" name="amount" value="5.00"/>
                    <input type="hidden" name="item_name" value="hanashi-1-month"/>
                    <input type="hidden" name="return_url" value="https://hanashi.website/profile"/>
                    <input type="hidden" name="cancel_url" value="https://hanashi.website/upgrade"/>
                    <input type="hidden" name="notify_url" value="https://hanashi-node.onrender.com/api/notify"/>

                    <input type="hidden" name="custom_str1" value={uid} />
                    <input type="hidden" name="custom_str2" value={email} />

                    <input type="submit"/>
                </form>
            </div>

            <p className="upgrade-note">
                You can continue using Hanashi for free with offline features.
            </p>
        </div>
    );
}

