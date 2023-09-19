import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
    <footer className=''>
        <Container>
            <Row>
                <Col className='text-center text-black py-3'>
                    <p>Musafir &copy; {currentYear} </p>
                </Col>
            </Row>
        </Container>
    </footer>
            )
}

export default Footer