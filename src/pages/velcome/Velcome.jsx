import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";
import logo from "./Kredo-bet.png";
import fon2 from "./fon2.png";

export default function Velcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-indigo-100/30 to-purple-100/30 transform -skew-y-6 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-indigo-200/20 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative z-10 py-8 md:py-12 lg:py-16">
            <Popover>
              <nav className="flex items-center justify-between">
                <div className="flex-shrink-0">
                  <img 
                    alt="Kredo-bet" 
                    className="w-36 sm:w-44 transition-transform duration-300 hover:scale-105"
                    src={logo}
                  />
                </div>
              </nav>
            </Popover>

            <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mt-12 md:mt-16 lg:mt-24">
              {/* Text content */}
              <div className="flex-1 lg:pr-12">
                <div className="max-w-xl">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                    <span className="block">Создание промтов</span>
                    <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      для ставок на спорт
                    </span>
                  </h1>
                  
                  <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                    Профессиональный инструмент для создания AI-промтов. Генерируйте точные прогнозы 
                    с помощью нейросетей и повышайте успешность ваших ставок.
                  </p>
                  
                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                    <Link
                      to="/registration"
                      className="px-6 py-4 text-center font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Регистрация
                    </Link>
                    <Link
                      to="/auth"
                      className="px-6 py-4 text-center font-bold rounded-xl bg-white text-indigo-600 border-2 border-indigo-100 shadow-md hover:border-indigo-300 transition-colors duration-300"
                    >
                      Войти
                    </Link>
                    <Link
                      to="/home/top"
                      className="sm:col-span-2 px-6 py-4 text-center font-semibold rounded-xl bg-transparent text-gray-700 hover:bg-gray-50 transition-colors duration-300 group"
                    >
                      Продолжить без регистрации
                      <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="flex-1 flex justify-center lg:justify-end w-full">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-2xl transform rotate-3 blur-sm" />
                  <img
                    className="relative w-full max-w-lg object-contain rounded-xl shadow-xl border-8 border-white"
                    src={fon2}
                    alt="AI прогнозы"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}