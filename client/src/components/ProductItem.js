import React from 'react'
import Button from 'react-bootstrap/Button'
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
          <Button className="p-1" variant="outline-secondary">
            Редактировать</Button>
          <Button className=" p-1" variant="outline-danger">Удалить</Button>
        </Card.Body>
      </Card>
    </Col >
  )
}

export default ProductItem
