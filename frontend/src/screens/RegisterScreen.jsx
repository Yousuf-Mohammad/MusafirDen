import React,{useState , useEffect} from 'react'
import { Link , useLocation , useNavigate } from 'react-router-dom'
import{Form , Button , Row , Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useRegisterMutation } from '../Slices/userApiSlice'
import { setCredentials } from '../Slices/authSlice'
import {toast} from 'react-toastify';
const RegisterScreen = () => {
    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')
    const [confirmPassword, setConfirmPassword] =useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register,{isLoading}] = useRegisterMutation();
    const {userInfo} =useSelector((state)=>state.auth); 
    const {search} = useLocation();
    const searchParam = new URLSearchParams(search);
    const redirect = searchParam.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo,redirect,navigate]);

    const submitHandler = async (e)=>{
        e.preventDefault();
        if(password!== confirmPassword){
            toast.error('Password do not match ');
            return;

        }else{
            try {
                const res = await register({name,email,password}).unwrap();
                dispatch(setCredentials({...res,}));
                navigate(redirect)
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
        
    }

    return (
    <div className='login'>
    <FormContainer>
    <Form onSubmit={submitHandler}>
        <Form.Group controlId= 'name' className='my-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control
        type='text'
        placeholder='Enter your Name'
        value={name}
        onChange={(e)=>setName(e.target.value)}
        >
        </Form.Control>
        </Form.Group>

        <Form.Group controlId= 'email' className='my-2'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
        type='email'
        placeholder='Enter your Email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        >
        </Form.Control>
        </Form.Group>

        
        <Form.Group controlId= 'password' className='my-2'>
        <Form.Label>password</Form.Label>
        <Form.Control
        type='password'
        placeholder='Enter your password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        >
        </Form.Control>
        </Form.Group>

        <Form.Group controlId= 'confirmPassword' className='my-2'>
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
        type='password'
        placeholder='Confirm password'
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        >
        </Form.Control>
        </Form.Group>
        <Button
        type='submit'
        variant='success'
        className=' form_button'
        disabled={isLoading}
        >Register </Button>

    </Form> 
    <Row className='py-2'>
        <Col>
        Already have an account? <Link to={redirect? `/login?redirect=${redirect}`: '/login'}>Login</Link>
        </Col>

    </Row>
    </FormContainer>
    </div>
    )
}

export default RegisterScreen 