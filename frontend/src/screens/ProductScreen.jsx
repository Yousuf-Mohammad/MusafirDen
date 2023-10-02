import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { useParams ,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row,Col,Image, ListGroup , Card , Button, Form} from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../Slices/productApiSlice';
// import axios from 'axios';
import { addToCart } from '../Slices/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';

const ProductScreen = () => {
    const {id:productId}= useParams();

    const dispatch = useDispatch();

    // const navigate = useNavigate();

    const [qty,setQty] = useState(1);

    
    // const [product,setProduct]= useState({});
    // useEffect(()=>{
    //     const fetchProducts= async ()=>{
    //         const {data} = await axios.get(`/api/products/${productId}`);
    //         setProduct(data);
    //     }
    //     fetchProducts();
    // },[productId])

    const {data:product , isLoading , error} = useGetProductDetailsQuery(productId);

    const addToCartHandler =() =>{
        dispatch(addToCart({...product, qty }));
        alert('product is added')
        
        // navigate('/cart')
    }

return (
    <>
        <Link className='btn btn-light my-3 ' to="/">Go Back </Link>
        {
            isLoading? (<Loader/>) :
            error?(<h1>{error?.data?.message}|| {error.error}</h1>) :
            (
                <>
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
                                <Col>
                                
                                <strong>{product.price}BDT</strong>
                                {product.prevPrice? <h6 className='prevPrice'>({product.prevPrice})</h6> : null}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col><strong>{product.countInStock>0 ? 'In Stock' : 'Out of Stock'}
                                </strong> </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock>0 &&(
                            <ListGroup.Item>
                                <Row>
                                    <Col>Quantity</Col>
                                    <Col>
                                    <Form.Control
                                        as ='select'
                                        value={qty}
                                        onChange={(e)=>setQty(Number(e.target.value))}
                                    >
                                        {[...Array(product.countInStock).keys()].map((x)=>(<option key={x+1} value={x+1}>
                                            {x+1} 
                                        </option>))}
                                    </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        {product.countInStock!==0?<ListGroup.Item>
                        <Button 
                            className='btn-block'
                            type='button'
                            onClick={addToCartHandler}
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

       
    </>
)
}

export default ProductScreen