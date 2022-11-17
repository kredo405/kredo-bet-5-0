import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from "react-redux";
import { Modal } from 'antd';
import logo from './logo2.png'

const errorModal = (message) => {
  Modal.error({
    title: message
  });
}

const providerGoogle = new GoogleAuthProvider()
const providerFacebook = new FacebookAuthProvider();
const providerGithub = new GithubAuthProvider();

const Registration = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { app } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const onValueChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const googleAuth = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user)

        localStorage.setItem('token', token);
        localStorage.setItem('email', user.email);
        localStorage.setItem('photoURL', user.photoURL);
        localStorage.setItem('name', user.displayName);
        dispatch({
          type: 'TOKEN',
          payload: token
        })
        if (token) {
          navigate("/home", { replace: true });
        }

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential)
        // ...
      });
  }

  const facebookAuth = () => {
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user)

        localStorage.setItem('token', token);
        localStorage.setItem('email', user.email);
        localStorage.setItem('photoURL', user.photoURL);
        localStorage.setItem('name', user.displayName);
        dispatch({
          type: 'TOKEN',
          payload: token
        })
        if (token) {
          navigate("/home", { replace: true });
        }

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential)
        // ...
      });
  }

  const gitHubAuth = () => {
    signInWithPopup(auth, providerGithub)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user)

        localStorage.setItem('token', token);
        localStorage.setItem('email', user.email);
        localStorage.setItem('photoURL', user.photoURL);
        localStorage.setItem('name', user.displayName);
        dispatch({
          type: 'TOKEN',
          payload: token
        })
        if (token) {
          navigate("/home", { replace: true });
        }

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential)
        // ...
      });
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
        if (user.accessToken) {
          navigate("/home", { replace: true });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorModal(error.message);
      });
  }

  return (
    <>
      <div className="min-h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
        <div className="flex mt-5">
          <button className="px-3" onClick={googleAuth}><img className="w-[55px]" src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="google" /></button>
          <button className="px-3" onClick={facebookAuth}><img className="w-[55px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/2048px-Facebook_icon.svg.png" alt="facebook" /></button>
          <button className="px-3" onClick={gitHubAuth}><img className="w-[55px]" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github" /></button>
        </div>
      </div>
    </>
  )
}

export default Registration;