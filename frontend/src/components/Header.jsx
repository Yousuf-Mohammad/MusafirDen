import {Navbar, Nav, Container, Badge} from 'react-bootstrap';
import {FaShoppingCart, FaUser}from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import logo from '../assets/Logos/onlinelogomaker-091323-0509-3481-2000-transparent.png'

function Header() {

  const {cartItems } = useSelector((state)=>state.cart);
  return (
    <header>
        <Navbar bg='success' variant='light' expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand >
              <img src={logo} alt="WanderLust" width={200}/>             
            </Navbar.Brand>
          </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                  <Nav.Link > <FaShoppingCart/> Cart 
                  {cartItems.length >0 && (
                    <Badge bg='info' pill style={{marginLeft:'3px'}} className=''>
                        {cartItems.reduce((accumilator,current)=> accumilator+current.qty,0)}
                    </Badge>
                  ) }
                  </Nav.Link>
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