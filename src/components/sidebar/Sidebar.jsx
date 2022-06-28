import { Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './sidebar.scss';

const Sidebar = () => {

  let activeStyle = {
    textDecoration: "none",
    color: 'black',
  };

  return (
    <Container>
    <Nav variant="tabs" defaultActiveKey="matches">
      <Nav.Item>
        <Nav.Link eventKey="matches">
          <NavLink
              style={({ isActive }) =>
              isActive ? activeStyle : undefined
              } 
              to='/home/matches'>Все матчи</NavLink>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">
          <NavLink
              style={({ isActive }) =>
              isActive ? activeStyle : undefined
              } 
              to='/home/live'>Live</NavLink>
        </Nav.Link>
      </Nav.Item>
    </Nav>
    </Container>
  );
}

export default Sidebar;