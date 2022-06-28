import ListMatchesLive from '../../components/listMatchesLive/ListMatchesLive'
import { Container } from 'react-bootstrap';
import './live.scss';

const Live = (props) => {
    return (
        <div className="live">
            <Container className="justify-content-center">
                <ListMatchesLive />
            </Container>
        </div>
    );
}

export default Live;