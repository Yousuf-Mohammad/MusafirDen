import React from 'react'
import { Link,useParams } from 'react-router-dom'
import { Row,Col, ListGroup,Image , Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery ,useDeliverOrderMutation} from '../Slices/ordersApiSlice'
import { toast } from 'react-toastify'




const OrderScreen = () => {

    const {id: orderId} =useParams();
    const {
        data: order,
        refetch,
        isLoading,
        error,
        } = useGetOrderDetailsQuery(orderId);

    const [deliverOrder,{isLoading:loadingDeliver }]=useDeliverOrderMutation();
    
    
    console.log(order);

    const { userInfo } = useSelector((state) => state.auth);
    

    const deliverOrderhandler =async()=>{
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered')
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

    return isLoading && loadingDeliver ? <Loader/> : error ? <Message varient='danger'>{Error}</Message>:(
        <>
        <h4>Order {orderId}</h4>
        <Row>
            <Col md={8}>
                <ListGroup>
                    <ListGroup.Item>
                        <h3>Shipping to</h3>
                        <p>
                            <strong>Name : </strong> {order?.user?.name}
                        </p>
                        <p>
                            <strong>Email : </strong> {order?.user?.email}
                        </p>
                        <p>
                            <strong>Adress : </strong> {order?.shippingAddress?.address}{order?.shippingAddress?.city}-{order?.shippingAddress?.postalCode}
                        </p>

                        {order?.isDelivered?<Message varient='success'>Delivered on : {order?.deliveredAt?.substring(0,10)}</Message>:<Message varient='warning'>Order On Process</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>Payment</h3>
                        <p><strong>Payment Method :</strong>{order?.paymentMethod}</p>
                    
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {order?.orderItems?.map((item,index)=>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={2} >
                                    <Image className='placedOrderImage' src={item?.image}/>
                                    </Col>
                                    <Col md={6}>
                                    <Link to={`/product/${item?.product}`}> {item?.name}
                                    </Link>
                                    </Col>
                                    <Col md={4}>
                                        {item?.qty}X{item?.price} =  {item?.qty * item?.price}Tk
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                        ))}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Order Summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>{order?.itemPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping Charge</Col>
                                <Col>{order?.shippingPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total</Col>
                                <Col>{order?.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                    {userInfo && userInfo.isAdmin && !order?.isDelivered && (
                        <ListGroup.Item>
                            <Button
                            type='button'
                            className='btn btn-block'
                            onClick={deliverOrderhandler}>
                                Mark as Delivered
                            </Button>
                        </ListGroup.Item>
                    )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default OrderScreen