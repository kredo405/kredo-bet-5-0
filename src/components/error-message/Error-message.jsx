import { Alert } from 'antd';


const ErrorMessage = (props) => {
    return (
        <Alert
      message="Ошибка!"
      description={props.message}
      type="error"
      showIcon
      closable
    />
    )
}

export default ErrorMessage;