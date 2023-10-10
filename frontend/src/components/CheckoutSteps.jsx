import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaCheckSquare, FaSquare } from 'react-icons/fa'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1?(
                    <LinkContainer to="/login"  className='bg-success rounded text-primary mx-1'>
                        <Nav.Link >
                            <FaCheckSquare className='me-1'/>Sign in
                        </Nav.Link>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled>
                            Sign in
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2?(
                    <LinkContainer to="/Shipping"  className='bg-success rounded text-primary mx-1'>
                        <Nav.Link>
                        <FaCheckSquare className='me-1'/>Address
                        </Nav.Link>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled className='text-danger bg-danger mx-1'>
                            Shipping
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3?(
                    <LinkContainer to="/payment" className='bg-success rounded text-primary mx-1'>
                        <Nav.Link>
                        <FaCheckSquare className='me-1'/> Payment
                        </Nav.Link>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled className='bg-warning rounded mx-1 text-primary'>
                    <FaSquare className='me-1'/>
                            Payment
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4?(
                    <LinkContainer to="/placeorder" className='bg-success rounded text-primary mx-1'>
                        <Nav.Link>
                        <FaCheckSquare className='me-1'/> Place Order
                        </Nav.Link>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled className='bg-warning rounded mx-1 text-primary'>
                            <FaSquare className='me-1'/>Place Order
                    </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps