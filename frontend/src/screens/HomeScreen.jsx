// import React,{useEffect, useState} from 'react'
import {Row, Col } from "react-bootstrap"
import Product from '../components/Product'
import { useGetProductsQuery } from "../Slices/productApiSlice"
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import Carosel from "../components/Carosel";
// import axios from 'axios'
const HomeScreen = () => {
    const {pageNumber,keyword} =useParams();
// const [products,setProducts]= useState([]);
// useEffect(()=>{
//     const fetchProducts = async()=>{
//         const{data} =await axios.get('/api/products');
//         setProducts(data)
//     };
//     fetchProducts();
// },[]);

const {data, isLoading, error} = useGetProductsQuery({keyword,pageNumber});

return (
    
    <>     
        {isLoading? ( <Loader/>) : 
        error?( <h2>{error?.data?.message || error.error}</h2>):
        (
            <>
            {!Boolean(pageNumber)&& !Boolean(keyword)?(<Carosel/>):(null)}
            
            {/* <Loader/> */}
            <Row>
            {
                data.products.map((product)=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))
            }
            </Row>
            <Paginate
            pages={data.pages}
            page={data.page}
            keyword= {keyword? keyword:''}/>
            
            </>
        )}
        
    </>
    )
}

export default HomeScreen