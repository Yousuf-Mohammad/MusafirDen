import {Navbar, Nav, Container} from 'react-bootstrap';
import {FaShoppingCart, FaUser}from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import logo from '../assets/Logos/logo.png'

function Header() {
  return (
    <header>
        <Navbar bg='success' variant='light' expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand >
              <img src={logo} alt="WanderLust" width={70} />
              WanderLust
            </Navbar.Brand>
          </LinkContainer>


            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>

            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                  <Nav.Link > <FaShoppingCart/> Cart </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                  <Nav.Link> <FaUser/> Login </Nav.Link>
              </LinkContainer>
            </Nav>
            </Navbar.Collapse>

        </Container>
        </Navbar>
    </header>
  )
}

export default Header