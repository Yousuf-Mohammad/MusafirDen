import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser}from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector ,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../Slices/userApiSlice';
import { logout } from '../Slices/authSlice';
import logo from '../assets/Logos/onlinelogomaker-091323-0509-3481-2000-transparent.png'

function Header() {

  const {cartItems } = useSelector((state)=>state.cart);
  const {userInfo } = useSelector((state)=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

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
          
              {userInfo?(
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                  LogOut
                  </NavDropdown.Item>
                </NavDropdown>

              ):(
                <LinkContainer to='/login'>
                <Nav.Link> <FaUser/> Login </Nav.Link>
            </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin &&(
                <NavDropdown title='Dashboard' id='adminmenu'>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              
            </Nav>
            </Navbar.Collapse>

        </Container>
        </Navbar>
    </header>
  )
}

export default Header