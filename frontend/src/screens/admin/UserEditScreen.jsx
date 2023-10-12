import React, {useState, useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { Form,Button,Row, Col} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetUserDetailsQuery ,useUpdateUserMutation} from '../../Slices/userApiSlice'
import {toast} from "react-toastify"


const UserEditScreen = () => {

    const {id:userId} = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);


    const {data:user, isLoading,error,refetch} =useGetUserDetailsQuery(userId)

    const[updateUser,{isLoading:loadingUpdate,error:updateError}]= useUpdateUserMutation()

    const navigate =useNavigate();

    useEffect(()=>{
        if(user){
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    },[user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin });
            toast.success('user updated successfully');
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        };

        

    return (
    <>
    <Link to="/admin/productlist" className='btn btn-dark my-2 text-light '>Go Back</Link>

    {isLoading && loadingUpdate ? <Loader/>: error && updateError? <Message variant='danger'>{error||updateError}</Message>:(
        <>
        
        <Row className='justify-content-md-center'>
            <Col md={6} sm={12}>
            <Form onSubmit={submitHandler}>
            <h3>Edit User</h3>

            <Form.Group controlId='name'>
                
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='text'
                placeholder={"Users Name"}
                value={name}
                onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='email'>
                
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder={"Your Email Address"}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className='mt-2' controlId='isadmin'>
                <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
            </Form.Group>
            <Button
            type='submit'
            variant='success'
            className='form_button mt-3'>
                Update
            </Button>
            </Form>
            </Col>
        </Row>
        </>
    )}
    </>
    )
}

export default UserEditScreen