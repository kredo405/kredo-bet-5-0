import { List } from 'antd';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { useEffect } from "react";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const Facts = ({ info }) => {
    const [odds, setOdds] = useState({ odds: [{ name: "Победа 1", odd: "1" }] });
    const [elements, setElements] = useState([['Загрузка...', '...']]);

    useEffect(() => {
        const getDataOdds = async () => {
            const db = getFirestore(app);
            const docRef = doc(db, "decodingOdds", "odds");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setOdds(docSnap.data());

                const newArrFacts = info.facts.map(el => {
                    const arr1 = el[0].split('>');
                    const arr2 = arr1.map(item => {
                        if (item === '<strong') {
                            return '';
                        }
                        const pos1 = item.indexOf('<strong');
                        let str1 = '';

                        if (pos1 !== -1) {
                            str1 = item.slice(0, pos1);
                        };

                        if (str1 === '') {
                            return item
                        }
                        if (str1 !== '') {
                            return str1
                        }
                    });
                    const arr3 = arr2.map(item => {
                        if (item === '</strong') {
                            return '';
                        }
                        const pos1 = item.indexOf('</strong');
                        let str1 = '';

                        if (pos1 !== -1) {
                            str1 = item.slice(0, pos1);
                        };

                        if (str1 === '') {
                            return item
                        }
                        if (str1 !== '') {
                            return str1
                        }
                    });

                    return [arr3.join(' '), el[1]];
                });

                const elements = newArrFacts.map(el => {
                    const arr = [];
                    docSnap.data().odds.forEach(element => {
                        if (+element.odd === el[1]) {
                            arr.push(el[0]);
                            arr.push(element.name);
                        }
                    });

                    return arr;
                });
                console.log(elements)

                setElements(elements);
            } else {
                console.log("No such document!");
            }
        }

        getDataOdds();

    }, []);

    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-xl font-bold text-slate-600'>Факты</h2>
            </div>
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={elements}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<p className='font-lg font-semibold'>{item[0]}</p>}
                                description={item[1]}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </>
    )
}

export default Facts;