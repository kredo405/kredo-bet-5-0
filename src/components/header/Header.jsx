import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './header.scss';

const Header = (props) => {
  let email = localStorage.getItem('email');
  let navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
     navigate("/", { replace: true });
  }

  return (
    <header className='header'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Kredo bet</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
              <Nav.Link onClick={logOut}>Выйти</Nav.Link>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );

}

export default Header;