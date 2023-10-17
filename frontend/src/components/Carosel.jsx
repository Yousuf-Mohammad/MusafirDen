import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
const Carosel = () => {
    return (
        <Carousel fade>
        <Carousel.Item>
            <img src="https://i.pinimg.com/564x/8a/ae/cf/8aaecfc58979d0ef701f09fc26d58bc0.jpg" alt='first slide'className='carouselImage'/>
            <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img src="https://i.pinimg.com/564x/b4/b5/e2/b4b5e2fbc23108c0537b368104cce8a8.jpg" alt='first slide'className='carouselImage'/>
            <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img src="https://i.pinimg.com/564x/b4/b8/b6/b4b8b6c639fef1eafa77a41c3f0445de.jpg" className='carouselImage'/>
            <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    )
}

export default Carosel