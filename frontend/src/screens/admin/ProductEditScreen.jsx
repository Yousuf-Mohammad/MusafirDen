import React, {useState, useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { Form,Button,Row, Col,Image } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetProductDetailsQuery ,useUpdateProductMutation,useUploadProductImageMutation} from '../../Slices/productApiSlice'
import {toast} from "react-toastify"


const ProductEditScreen = () => {

    const {id:productId} = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [prevPrice, setPrevPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    const {data:product, isLoading,error,refetch} =useGetProductDetailsQuery(productId);
    
    const [uploadProductImage,{isLoading:loadingUpload}]=useUploadProductImageMutation();

    const [updateProducts, {isLoading:loadingUpdate, error:errorUpdate}]=useUpdateProductMutation();

    const navigate =useNavigate();

    useEffect(()=>{
        if(product){
            setName(product.name)
            setPrice(product.price)
            setPrevPrice(product.prevPrice)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    },[product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProducts({
            productId,
            name,
            price,
            prevPrice,
            image,
            brand,
            category,
            description,
            countInStock,
          }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
            toast.success('Product updated');
            refetch();
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        };

        const uploadFileHandler = async (e) => {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            try {
                const res = await uploadProductImage(formData).unwrap();
                toast.success(res.message);
                console.log(res.res);
                setImage(res.image);
            } catch (err) {
                
                toast.error(err?.data?.message || err.error);
            }
            };

    return (
    <>
    <Link to="/admin/productlist" className='btn btn-dark my-2 text-light '>Go Back</Link>

    {isLoading && loadingUpdate && loadingUpload ? <Loader/>: error && errorUpdate ? <Message variant='danger'>{error||errorUpdate}</Message>:(
        <>
        
        <Row className='justify-content-md-center'>
            <Col md={6} sm={12}>
            <Form onSubmit={submitHandler}>
            <h3>Edit Product</h3>
            <Image src ={`/Images/${image}`} style={{width:"100%"}}></Image>
            <Form.Group controlId='name'>
                
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='text'
                placeholder={"Products Name"}
                value={name}
                onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='prevPrice'>
                
                <Form.Label>Previous Price</Form.Label>
                <Form.Control
                type='text'
                placeholder={"Previous price"}
                value={prevPrice}
                onChange={(e)=>setPrevPrice(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='price'>
                
                <Form.Label>Price</Form.Label>
                <Form.Control
                type='text'
                placeholder={"Current Price"}
                value={price}
                onChange={(e)=>setPrice(e.target.value)}/>
            </Form.Group>


            <Form.Group controlId='brand'>
                
                <Form.Label>Brand</Form.Label>
                <Form.Control
                type='text'
                placeholder={"Brand"}
                value={brand}
                onChange={(e)=>setBrand(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                {/* <Form.Control
                type='text'
                placeholder='Enter image URL'
                value={image}
                onChange={(e)=>setImage()}></Form.Control> */}

                <Form.Control
                type='file'
                Label='Choose file'
                onChange={uploadFileHandler}

                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
                <Form.Label>In Stock Count</Form.Label>
                <Form.Control
                type='text'
                placeholder={"In stock Count"}
                value={countInStock}
                onChange={(e)=>setCountInStock(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                type='text'
                placeholder={"Products Category"}
                value={category}
                onChange={(e)=>setCategory(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                as='textarea'
                placeholder={"Products Description"}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className='descriptionBox'/>
                
            </Form.Group>
            <Button
            type='submit'
            variant='success'
            className='form_button mt-3'>
                Update
            </Button>
            </Form>
            </Col>
        </Row>
        </>
    )}
    </>
    )
}

export default ProductEditScreen