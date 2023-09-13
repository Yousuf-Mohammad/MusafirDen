import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row,Col, Image, ListGroup , Card , Button  } from 'react-bootstrap';
import products from '../product';
import Rating from '../components/Rating';
const ProductScreen = () => {
    const productId= useParams();
    const product= products.find((p)=>p._id==productId.id)
return (
    <>
        <Link className='btn btn-light my-3 ' to="/">Go Back </Link>

        <Row>
            <Col md={5}>
                <Image src={product.image} alt='product image'fluid />
            </Col>
            <Col md={4}>
                <ListGroup variant='flush '>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
                    </ListGroup.Item>
                    <ListGroup.Item >
                        {product.description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                            <h5>Brand : {product.brand}</h5>
                        </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col><strong>{product.price}BDT
                                </strong> </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col><strong>{product.countInStock>0 ? 'In Stock' : 'Out of Stock'}
                                </strong> </Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock!==0?<ListGroup.Item>
                        <Button 
                            className='btn-block'
                            type='button'
                            >
                                Add to Cart

                            </Button>
                        </ListGroup.Item>:null}
                        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
)
}

export default ProductScreen