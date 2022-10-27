import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from "react-redux";
import ErrorMessage from '../../components/error-message/Error-message';
import logo from './logo2.png'

const Registration = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');;
    const { app } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onValueChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem('token', user.accessToken);
                localStorage.setItem('email', user.email);
                dispatch({
                  type: 'TOKEN',
                  payload: user.accessToken
              })
                if(user.accessToken) {
                    navigate("/home/matches", { replace: true });
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(true);
                setErrorMessage(errorMessage);
            });
    }

    return (
        <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-16 w-auto"
                src={logo}
                alt="logo"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Регистрация</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={onSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email адрес
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    onChange={onValueChange}
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                    placeholder="Email адрес"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Пароль
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={onValueChange}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Пароль"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Регистрация
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='flex justify-center'>
          {error ? <ErrorMessage message={errorMessage}/> : null}
      </div>
      </>
    )
}

export default Registration;