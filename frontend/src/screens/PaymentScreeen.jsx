import React,{useState ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button , Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../Slices/cartSlice'


const PaymentScreeen = () => {

    const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery')

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const cart = useSelector((state)=>state.cart);
    const {shippingAddress }= cart

    useEffect(()=>{
    if(!shippingAddress){
        navigate('/shipping')
    }
    },[shippingAddress, navigate])

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }
    return (
        <>
    <CheckoutSteps step1 step2 step3 />

    <FormContainer>
        

            <h3 className='signInText'>Payment Method </h3>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend' >Select Method </Form.Label>
                    <Col>
                    <Form.Check
                    type='radio'
                    className='my-1'
                    label='BKash '
                    id='Payment'
                    name='paymentMethod'
                    value='BKash'
                    onChange={(e)=>setPaymentMethod(e.target.value)}>
                    </Form.Check>
                    </Col>
                    <Col>
                    <Form.Check
                    type='radio'
                    className='my-1'
                    label=' Cash on Delivery'
                    id='Payment'
                    name='paymentMethod'
                    value='Cash On Delivery'
                    onChange={(e)=>setPaymentMethod(e.target.value)}>
                    </Form.Check>
                    </Col>
                </Form.Group>

                <Button
                type='submit'
                variant='success'>
                    Continue
                </Button>
            </Form>
    </FormContainer>
    </>
    )
}

export default PaymentScreeen