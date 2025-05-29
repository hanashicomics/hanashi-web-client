import functions from 'firebase-functions';
import {applicationDefault, initializeApp} from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import axios from 'axios';
import * as express from "express";
import qs from "qs";


// Initialize Firebase
const app = initializeApp({
     credential: applicationDefault()
 });
const db = getFirestore(app);

// initializeApp({
//     credential: applicationDefault()
// });

//const db = getFirestore();


export const payfastNotify = functions.https.onRequest(async (req, res) => {
    const rawApp = express();
    rawApp.use(express.raw({type: '*/*'}));

    rawApp.post('/', async (req, res) => {
        const rawBody = req.body.toString(); // Capture raw body
        const pfData = qs.parse(rawBody);    // Optional: parse for inspection

        if (req.method !== "POST") {
            return res.status(405).send("Only POST allowed");
        }

        //const pfData = req.body;

        const verifyUrl = "https://www.payfast.co.za/eng/query/validate";

        try {
            const response = await axios.post(verifyUrl, pfData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (response.data !== "VALID") {
                console.error("Invalid PayFast IPN");
                return res.status(400).send("Invalid");
            }

            if (pfData.payment_status === "COMPLETE") {
                const email = pfData.email_address;
                console.log("Payment completed for:", email);

                //const usersRef = db.collection("users");
                //const snapshot = await usersRef.where("email", "==", email).limit(1).get();

                const userId = pfData.custom_str1; // Contains Firebase UID
                const userRef = db.collection("users").doc(userId);
                const userSnap = await userRef.get();

                if (userSnap.exists) {
                    await userRef.update({
                        plan: "pro",
                        upgradedAt: Timestamp.now(),
                    });
                    await saveTransaction(userId, pfData);
                } else {
                    console.log("No matching user found for:", email);
                }
            }

            return res.status(200).send("IPN received");
        } catch (err) {
            console.error("PayFast validation failed:", err);
            return res.status(500).send("Server error");
        }
    });

    async function saveTransaction(uid, transactionData) {
        try {
            const docRef = await db.collection("transactions").add({
                uid,
                transactionData,
                createdAt: Timestamp.fromDate(new Date()),
            });
            console.log("Transaction saved with ID:", docRef.id);
            return docRef.id;
        } catch (error) {
            console.error("Error saving transaction:", error);
            throw error;
        }
    }
})
