import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
const Carosel = () => {
    return (
        <Carousel fade>
        <Carousel.Item>
            <img src="https://img-cdn.pixlr.com/pixlr-templates/60804bfa2eb66c64feb0729a/preview.webp" alt='first slide'className='carouselImage'/>
            <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    )
}

export default Carosel