import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import {useNavigate} from 'react-router-dom'
import {PRODUCT_ROUTE} from '../utils/consts'

const ProductItem = ({product}) => {
  const history = useNavigate()
  return (
    <Col>
      <Card border="primary" style={{width: '18rem'}}
        onClick={() => history(PRODUCT_ROUTE + '/' + product.id)}>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>

        </Card.Body>
      </Card>
    </Col >
  )
}

export default ProductItem
