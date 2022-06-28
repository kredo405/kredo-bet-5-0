import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import './authorization.scss';

const Authorization = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();


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
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                const user = userCredential.user;
                localStorage.setItem('token', user.accessToken);
                localStorage.setItem('email', user.email);
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
        <div className="authorization">
            <div className='authorization__wrapper'>
                <div className="authorization__title-wrapper">
                    <h1>Авторизация</h1>
                </div>
                <Form onSubmit={onSubmit} className='authorization__form'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Введите email"
                            name="email"
                            value={email}
                            onChange={onValueChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            name="password"
                            value={password}
                            onChange={onValueChange} />
                    </Form.Group>
                    <div className="authorization__button-wrapper">
                        <Button className='authorization__button' variant="success" type="submit">
                            Войти
                        </Button>
                    </div>
                    <div className="authorization__registration-wrapper">
                        <p>Либо зарегистрируйтесь <Link to="/registration">Регистрация</Link></p>
                    </div>
                </Form>
                <div className="authtorization__error">
                        {error ?
                        <Alert variant='danger'>
                            {errorMessage}
                      </Alert>
                        : null}
                    </div>
            </div>
        </div>
    )
}

export default Authorization;