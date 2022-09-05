import { Alert } from 'react-bootstrap';

const ErrorMessage = (props) => {
    return (
        <Alert key='danger' variant='danger'>
            {props.message}
        </Alert>
    )
}

export default ErrorMessage;