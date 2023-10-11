import React ,{useState,useEffect}from 'react'
import { Table,Form , Button , Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {toast} from 'react-toastify'
import { useProfileMutation } from '../Slices/userApiSlice'
import { setCredentials } from '../Slices/authSlice'
import { useGetMyOrdersQuery } from '../Slices/ordersApiSlice'




const ProfileScreen = () => {

    const [name,setName] =useState("");
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [confirmPassword,setConfirmPassword] =useState("");

    const dispatch =useDispatch();

    const {userInfo} =useSelector((state)=>state.auth);
    const [updateProfile,{isLoading:loadingUpdateProfile}] =useProfileMutation();
    const {data:orders, isLoading,error} =useGetMyOrdersQuery();


    useEffect((userInfo)=>{
        setName(userInfo?.name);
        setEmail(userInfo?.email);

    },[userInfo,userInfo.name, userInfo.email])

    const submitHandler = async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            toast.error('Password do not match')
        }else{
            try {
                const res = await updateProfile({_id:userInfo._id,name,email, password}).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile Updated')
            } catch (error) {
                toast.error(error?.data.message || error.error)
            }
        }
    }


    return (
    <Row>
        {loadingUpdateProfile && isLoading? <Loader/> : error?(<Message variant='danger'>{error?.data?.message || error.error}</Message>):(<>
            <Col md={4}>
            <h2>User Profile</h2>
        
            <Form onSubmit={submitHandler} className='form'>
                <Form.Group controlId='name' className='my-1'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Your Name'
                        value={userInfo?.name}
                        onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='email' className='my-1'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Your Email'
                        value={userInfo?.email}
                        onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='password' className='my-1'>
                    <Form.Label>Your Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Your Password'
                        value={userInfo?.password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-1'>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={userInfo?.password}
                        onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </Form.Group>
                <Button
                type='submit'
                variant='success'
                className='my-1 form_button'
                >
                    Update
                </Button>
            </Form>
            
        </Col>
        <Col md={8}>
            <h3>My Orders</h3> 
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order)=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}Tk</td>
                            <td>{order.isDelivered? "Delivered":"On Process"}</td>
                            <td>
                                <LinkContainer to={`/orders/${order._id}`} >
                                <Button variant='light border'>
                                    Detail
                                </Button>
                                </LinkContainer>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>

        </Col>
        </>)}
    </Row>)

}

export default ProfileScreen