import React from 'react'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
const Product = ({ product }) => {
  return (
    <>
    <Card className='my-3 p-3 rounded productCard '>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} height={350} variant='top'/>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="h6" className='product-title'>
            {product.name}
          </Card.Title>
          <Card.Text as='div'>
            <Rating value={product.rating} text={product.numReviews}/>
          </Card.Text>
          <Card.Text as='h5'>
          {product.price}BDT
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
    </>
  )
}

export default Product