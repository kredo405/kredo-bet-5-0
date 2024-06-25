import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export default async function getOdds() {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);
            const docRef = doc(db, "decodingOdds", "odds");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                return docSnap.data();
            } else {
                console.log("No such document!");
                return null;
            }
}