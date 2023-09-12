import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
    <footer className=''>
        <Container>
            <Row>
                <Col className='text-center text-black py-3'>
                    <p>WanderLust &copy; {currentYear} </p>

                </Col>
            </Row>
        </Container>

    </footer>
            )
}

export default Footer