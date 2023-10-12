import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Button, Table,Row , Col } from 'react-bootstrap'
import { FaEdit,FaTrash } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetProductsQuery ,useCreateProductMutation } from '../../Slices/productApiSlice'
import { toast } from 'react-toastify'
const ProductListScreeen = () => {

    const {data:products,isLoading,error ,refetch} =useGetProductsQuery();
    const[createProduct,{isLoading:loadingCreate,}]=useCreateProductMutation();
    console.log(products);

    const deleteHandler = async() =>{

    }

    const createProductHandler =async()=>{
        if(window.confirm('Are you sure you want to create a new product?')){
            try {
                await createProduct();
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error?.error)
            }

        }
    }

    return (
    <>
        <Row className='align-items-center'> 
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-end'>
            <Button className='btn-sm m-2' onClick={createProductHandler}><FaEdit/> Create Product</Button>
        </Col>
        </Row>

        {isLoading && loadingCreate?<Loader/> : error? <Message variant='danger'>{error}</Message>:(
            <>
            <Table striped hover responsive className='table-sm'>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>PrevPrice</td>
                    <td>Category</td>
                    <td>Brand</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {products?.map((product)=>(
                    <tr key={product?._id}>
                        <td>{product?._id}</td>
                        <td>{product?.name }</td>
                        <td>{product?.price }</td>
                        <td>{product?.prevPrice }</td>
                        <td>{product?.category }</td>
                        <td>{product?.brand}</td>
                        <td>
                            <LinkContainer to={`/admin/product/${product?._id}/edit`}>
                                <Button variant='info' className='btn-sm mx-2 border-dark'>
                                    <FaEdit style={{color:"white"}}/> 

                                </Button>
                            </LinkContainer>
                            <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={()=>deleteHandler(product._id)}>
                                <FaTrash style={{color:"white"}}/>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
            </>
        )}
    </>
    )
}

export default ProductListScreeen