import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { nbbetServices } from "../../services/nbbet";
import { BackTop, Modal, Empty } from 'antd';
import { Loading } from "../Loading/Loading";
import { setMatches } from "../../store/slices/matchSlice";

const errorModal = (message) => {
    Modal.error({
        title: message
    });
};

const Matches = () => {
    const [arrMatches, setArrayMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => {
        if (state.firebaseSlice.token === '') {
            history('/');
        }

        const getData = async () => {
            try {
                const allMatches = await nbbetServices.getAllMatches();

                const filterMatches = allMatches.data.matches.data.leagues.filter(el => {
                    const arrayMatches = el['4'].filter(item => item['4'] > Date.now());
                    el[4] = arrayMatches;
                    if (arrayMatches.length > 0) {
                        return el;
                    }
                });

                setArrayMatches(filterMatches)
                dispatch(setMatches(filterMatches));
                setIsLoading(true);
            }
            catch (error) {
                console.error(error)
                errorModal(error.message)
            }
        }

        getData()

    }, []);

    let elements;

    if (arrMatches.length > 0) {
        elements = arrMatches.map((el, i) => {
            let matchElements = el['4'].map((item, i) => {
                return (
                    <div key={item['3']} onClick={() => {
                        history('/match');
                        sessionStorage.setItem('link', item[3]);
                    }
                    } className="hover:bg-gray-300 w-full h-16 bg-slate-50 flex justify-around items-center mb-2.5 px-2 border-1 rounded-xl border-solid border-slate-300">
                        <div className="flex pr-2 items-center w-4/12">
                            <img className="w-[20px] md:w-[30px]" src={item['8']} alt="logo" />
                            <span className="px-1 md:px-3 font-mono text-slate-700 text-sm lg:text-xl">{item['7']}</span>
                        </div>
                        <div className="flex pl-2 items-center w-4/12">
                            <img className="w-[20px] md:w-[30px]" src={item['16']} alt="logo" />
                            <span className="px-1 md:px-3 font-mono text-slate-700 text-sm lg:text-xl">{item['15']}</span>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <span className="text-xs md:text-base lg:text-lg lg:font-bold px-1 lg:px-2 font-mono text-green-600">{item['5'] ? item['5']['1'].toFixed(1) : null}</span>
                            <span className="text-xs md:text-base lg:text-lg lg:font-bold px-1 lg:px-2 font-mono text-cyan-500">{item['5'] ? item['5']['3'].toFixed(1) : null}</span>
                            <span className="text-xs md:text-base lg:text-lg lg:font-bold px-1 lg:px-2 font-mono text-amber-600">{item['5'] ? item['5']['2'].toFixed(1) : null}</span>

                        </div>
                    </div>
                )
            });
            return (
                <div key={i}>
                    {matchElements.length !== 0 ?
                        <div className="mb-2 p-2">
                            <div className="w-full h-14 flex justify-between items-center bg-slate-50 mb-2">
                                <div className="flex items-center ml-2 w-full">
                                    <span className="p-2 font-medium font-mono text-lg text-gray-600">{el['1']} {el['3']}</span>
                                </div>
                            </div>
                            <div>
                                {matchElements}
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            )
        });
    }
    else {
        elements = <div className="h-screen flex justify-center items-center">
            <Empty
                description={
                    <span className="font-mono text-lg font-medium text-gray-700">
                        На данный момент нет матчей
                    </span>
                }
            >
            </Empty>
        </div>
    }

    return (
        <div className="container lg:px-44 mt-20">
            <BackTop />
            {isLoading ?
                elements :
                <Loading />
            }
        </div>
    )
}

export default Matches;
