import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './registration.scss';

const Registration = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');;
    const { app } = props;
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
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                // Signed in 
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
        <div className="registration">
            <div className='registration__wrapper'>
                <div className="registration__title-wrapper">
                    <h1>Регистрация</h1>
                </div>
                <Form onSubmit={onSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control
                            type="email"
                            placeholder="Введите Email"
                            name="email"
                            value={email}
                            onChange={onValueChange} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Пароль">
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            name="password"
                            value={password}
                            onChange={onValueChange} />
                    </FloatingLabel>
                    <div className="registration__button-wrapper">
                        <Button className='registration__button' variant="success" type="submit">
                            Регистрация
                        </Button>
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

export default Registration;