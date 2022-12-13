import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const ProductItem = ({product}) => {
  return (
    <Col>
      <Card border="primary" style={{width: '18rem'}}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            Операционная система: {product.OS}
          </Card.Text>

        </Card.Body>
      </Card>
    </Col >
  )
}

export default ProductItem
