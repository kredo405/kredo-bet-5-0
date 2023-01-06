import { Link } from 'react-router-dom';
import { Popover } from '@headlessui/react'
import { nbbetServices } from '../../services/nbbet';
import { predictionsServices } from '../../services/predctions';
import { arbworldServices } from '../../services/arbworld';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Modal } from 'antd';
import logo from './Kredo-bet.png';
import fon2 from './fon2.png';

const errorModal = (message) => {
  Modal.error({
    title: message
  });
};

export default function Velcome() {

  const dispatch = useDispatch();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const euroFootball = await predictionsServices.getEuroFootball();
        const betzona = await predictionsServices.getBetzona();
        const legalbet = await predictionsServices.getLegalbet();
        const liveresult = await predictionsServices.getLiveresult();
        const stavkiprognozy = await predictionsServices.getStavkiprognozy();
        const oddsRu = await predictionsServices.getOddsRu();
        const correctScore = await arbworldServices.getcorrectScore();
        const moneyWay1X2 = await arbworldServices.getMoneyWay1x2();
        const moneyWayUnderOver = await arbworldServices.getMoneyWayUnderOver();



      console.log(correctScore)

        dispatch({
          type: 'CORRECTSCORE',
          payload: correctScore.data.moneyWay
        });
        dispatch({
          type: 'MONEYWAY1X2',
          payload: moneyWay1X2.data.moneyWay
        });
        dispatch({
          type: 'MONEYWAYOVERUNDER',
          payload: moneyWayUnderOver.data.moneyWay
        });
        dispatch({
          type: 'BETZONA',
          payload: betzona.data.predicitons
        });
        dispatch({
          type: 'EUROFOOTBALL',
          payload: euroFootball.data.predicitons
        });
        dispatch({
          type: 'LEGALBET',
          payload: legalbet.data.predicitons
        });
        dispatch({
          type: 'LIVERESULT',
          payload: liveresult.data.predicitons
        });
        dispatch({
          type: 'STAVKIPROGNOZY',
          payload: stavkiprognozy.data.predicitons
        });
        dispatch({
          type: 'ODDSRU',
          payload: oddsRu.data.predicitons
        });
      }
      catch (error) {
        console.log(error)
        errorModal(error.message)
      }
    }

    getInfo();
  }, []);

  return (
    <div className="container">
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Popover>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <a href="#">
                        <span className="sr-only">Kredo-Bet</span>
                        <img
                          alt="Kredo-bet"
                          className="w-44 sm:h-32"
                          src={logo}
                        />
                      </a>
                    </div>
                  </div>
                </nav>
              </div>

              <Popover.Panel
                focus
                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img
                        className="h-16 w-auto"
                        src={logo}
                        alt="logo"
                      />
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Popover>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl flex flex-col">
                  <span className="block xl:inline">Прогнозирование и аналитика</span>{' '}
                  <span className="block text-indigo-600 xl:inline">для ставок на спорт</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  На сайте представлена продвинутая статистика, денежные потоки, прогнозы с топовых сайтов, а также
                  математические прогнозы на основе теории вероятности
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/registration"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 mt-3"
                    >
                      Регистрация
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/auth"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Войти
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:inset-2/4 lg:w-8/12">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-screen"
            src={fon2}
            alt="fon"
          />
        </div>
      </div>
    </div>
  );
}