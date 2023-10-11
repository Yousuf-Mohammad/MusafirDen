import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Button, Table} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetOrdersQuery } from '../../Slices/ordersApiSlice'

const OrderListScreen = () => {
    const {data:orders,isLoading,error}= useGetOrdersQuery();
    
    return (
    <>
    {isLoading? <Loader/>: error?<Message variant='danger'>{error}</Message> :(
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Delivered</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order)=>(
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>{order.totalPrice}Tk</td>
                        <td>{order.isDelivered? (order.deliveredAt.substring(0,10)):("Not Delivered yet")}</td>
                        <td><LinkContainer to={`/orders/${order._id}`}>
                            <Button>
                                Detail
                            </Button>
                            </LinkContainer>
                        </td>
                    </tr>
                ))}
            </tbody>

        </Table>

    )}
    </>
    )
}

export default OrderListScreen