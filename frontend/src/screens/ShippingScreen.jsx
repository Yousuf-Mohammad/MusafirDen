import React,{useState} from 'react'
import { Form , Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../Slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen=()=>{
    const cart =useSelector((state)=>state.cart);
    const {shippingAddress} = cart;

    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const [address, setAddress] = useState(shippingAddress?.address||"");
    const [city, setCity] = useState(shippingAddress?.city||"");
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode||"");



    const submitHandler =()=>{
        dispatch(saveShippingAddress({address,city,postalCode}));
        navigate('/payment')

    }
    return( 
        <>
        <CheckoutSteps step1 step2 />
    <FormContainer>
        
        <h3 className='signInText'>Shipping Address</h3>
        <Form onSubmit={submitHandler}>
            
            <Form.Group controlId='address' className=''>
                <Form.Label>Your Address</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Your Address'
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='city' className=''>
                <Form.Label>City</Form.Label>
                <Form.Control
                type='text'
                placeholder='Your City'
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode' className=''>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                type='text'
                placeholder='Your Postal Code'
                value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>
            <Button
            type='submit'
            variant='success'
            className=' form_button mt-2'
            >
                Submit
            </Button>
        </Form>

    </FormContainer>
    </>)
}

export default ShippingScreen