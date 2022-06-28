import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './velcome.scss';


const Velcome = () => {

  return (
    <div className="velcome">
      <Container>
        <div className="velcome__title-wrapper">
          <h1>Приветсвуем в Kredo-bet</h1>
        </div>
        <div className="velcome__buttons-group">
          <div className="d-grid gap-2">
              <Link className='velcome__link' to='/auth'>
              <Button className='velcome__btn' variant="primary" size="lg">Войдите</Button>
              </Link>
            <div className="velcome__text">
              <p>или</p>
            </div>
            <Link className='velcome__link' to='/registration'>
            <Button className='velcome__btn' variant="success" size="lg">Зарегистрируйтесь</Button>
            </Link>
           
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Velcome;