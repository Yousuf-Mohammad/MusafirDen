import React,{useState} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row,Col,Image, ListGroup , Card , Button, Form} from 'react-bootstrap';
import {toast} from 'react-toastify';
import { useGetProductDetailsQuery,useCreateReviewMutation } from '../Slices/productApiSlice';
// import axios from 'axios';
import { addToCart } from '../Slices/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
    const {id:productId}= useParams();

    const dispatch = useDispatch();

    // const navigate = useNavigate();

    const [qty,setQty] = useState(1);
    const [rating, setRating] =useState(0);
    const [comment,setComment] =useState('');

    
    // const [product,setProduct]= useState({});
    // useEffect(()=>{
    //     const fetchProducts= async ()=>{
    //         const {data} = await axios.get(`/api/products/${productId}`);
    //         setProduct(data);
    //     }
    //     fetchProducts();
    // },[productId])

    const {data:product , isLoading , error,refetch } = useGetProductDetailsQuery(productId);
console.log(product);
    const [createReview]=useCreateReviewMutation();

    const {userInfo} =useSelector((state)=>state.auth);

    const addToCartHandler =() =>{
        dispatch(addToCart({...product, qty }));
        toast.success('Product is added to your cart')
        
        // navigate('/cart')
    }
    
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            await createReview({
                productId,
                rating,
                comment
            }).unwrap();
            refetch();
            toast.success('Review Submitted');
            setRating(0);
            setComment('')
        } catch (error) {
            toast.error(error?.data?.message || error?.error)
        }
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
                <Image src= {`/Images/${product.image}`} alt='product image'fluid />
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
                <Row className='review'>
                        <Col md={6}>
                            {product.reviews.length===0? <Message >No Reviews is posted for this product </Message>:
                            (<div className='p-2'>
                            <Message><h3>Customer Reviews</h3></Message>
                            <ListGroup variant='flush'>
                                {product.reviews?.map((review)=>(
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}/>
                                        <p>{review.createdAt.substring(0,10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                
                            </ListGroup>
                            
                            </div>)}
                        </Col>


                        <Col md={6}>
                        
                            
                            {userInfo? (
                                <Form onSubmit={submitHandler} className='formReview'>
                                    <h3 className="text-center  signInText">Write a review</h3>
                                <Form.Group controlId='rating' className='my-1'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                as='select'
                                value={rating}
                                onChange={(e)=> setRating(Number(e.target.value))}>
                                <option value=''> Select</option>
                                <option value='1'> 1-Poor</option>
                                <option value='2'> 2-Fair</option>
                                <option value='3'> 3-Good</option>
                                <option value='4'> 4-Very Good</option>
                                <option value='5'> 5-Awesome</option>
                                </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment' className='my-1'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                as='textarea'
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Button
                                type='submit'
                                variant='primary'
                                >
                                Submit
                                </Button>
                                </Form>):(
                                <Message>
                                Please <Link to='/login'> LogIn </Link>to write a review
                                </Message>
                            )}

                        
                        </Col>
                </Row>
                </>
            )
        }

    
    </>
)
}

export default ProductScreen