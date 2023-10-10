import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { Button, Row, Col , ListGroup , Image, Card  } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Loader from '../components/Loader'
import { useCreateOrderMutation } from '../Slices/ordersApiSlice'
import { clearCartItems } from '../Slices/cartSlice'
import Message from '../components/Message'


const PlaceOrderScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart)


    useEffect(()=>{
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        }else if(!cart.paymentMethod){
            navigate('/payment')
        }
    },[cart.paymentMethod, cart.shippingAddress.address , navigate]);


    const [createOrder, {isLoading}]= useCreateOrderMutation();

    const placeOrderHandler = async () => {
        try{ 
            
            const res = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemPrice: cart.itemPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/orders/${res._id}`);
        } catch (err) {
            toast.error(err);
        }
        };

    return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        {isLoading? <Loader/> :<Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>Shipping to</h3>
                        <p>
                            <strong>Address :</strong>
                            {" "}{cart.shippingAddress.address}{" "}{cart.shippingAddress.city}{"-"}{cart.shippingAddress.postalCode}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>Payment Method</h3>
                        <strong>Method:</strong>
                        {" "}{cart.paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>Ordered Items</h3>
                        {cart.cartItems.length ===0 ? (
                            <Message>Your Cart is Empty</Message>
                        ):(
                            <ListGroup variant='Flush'>
                                {cart.cartItems.map((item,index )=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2} lg={2}>
                                                <Image className='placedOrderImage' src={item.image} alt='item.name' fluid rounded />
                                            </Col>
                                            <Col>
                                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty}X{item.price} = {item.qty*item.price}Tk
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Products Price: </Col>
                                            <Col>
                                            {cart.itemPrice} Tk
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping Cost: </Col>
                                            <Col>
                                            {cart.shippingPrice} Tk
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total: </Col>
                                            <Col>
                                            {cart.totalPrice} Tk
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button
                                        type='button'
                                        className='btn-block'
                                        disabled={cart.cartItems.length===0}
                                        onClick={placeOrderHandler}>
                                            Place Order
                                        </Button>
                                    </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>}
    </>
    )
}

export default PlaceOrderScreen