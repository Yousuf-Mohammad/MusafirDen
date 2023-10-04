import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row,Col,ListGroup,Image, Form , Button ,Card  } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart,removeFromCart } from '../Slices/cartSlice';
const CartScreen = () => {

    const navigate =useNavigate();
    const dispatch = useDispatch();
    

    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;

    const addToCartHandler = async(product, qty)=>{
        dispatch(addToCart({...product,qty}))
    }
    const removeFromCartHandler = async(id)=>{
        dispatch(removeFromCart(id))
    }
    const checkOutHandler =async()=>{
        navigate('/login?redirect=/shipping');
    }


    return (
    <Row>
        <Col md={8}>
        {cartItems.length!==0&& (
                <Row><Link to='/' style={{textDecoration:'none', color:'white', }}><Button>Continue Shopping </Button> </Link></Row>
        )}
            <h1 style={{marginBottom: '20px'}}>Your Shopping Cart</h1>
            {cartItems.length===0?(
                <Message>
                    Your Cart is Empty <Link to='/'>Go Back</Link>
                </Message>
            ):(
                <>
                
                <ListGroup variant='flush'>
                    {cartItems.map((item)=>(
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item._id}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                <Col md={2}>
                                    {item.price} BDT
                                </Col>
                                <Col md={2}>
                                <Form.Control
                                        as ='select'
                                        value={item.qty}
                                        onChange={(e)=>{addToCartHandler(item,Number(e.target.value))}}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x)=>(<option key={x+1} value={x+1}>
                                            {x+1} 
                                        </option>))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light' 
                                    onClick={()=>removeFromCartHandler(item._id)}>
                                        <FaTrash/>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                </>
            )}
            
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                        <h3>
                            SubTotal ({cartItems.reduce((accu,item)=>accu+item.qty,0)})
                        </h3>

                        {cartItems.reduce((accu,item)=>accu+item.qty*item.price,0).toFixed(2)} BDT
                    </ListGroup.Item>
                    


                    {cartItems.length !==0 && (
                        <ListGroup.Item>
                        <Button type='button'
                        className='btn-block'
                        onClick={checkOutHandler}>
                            Proceed To CheckOut
                        </Button>
                    </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </Col>
    </Row>
    )
}

export default CartScreen