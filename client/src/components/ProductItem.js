import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import {useNavigate} from 'react-router-dom'
import {PRODUCT_ROUTE, PRODUCT_CHANGE_ROUTE} from '../utils/consts'


const ProductItem = ({product, onDelete}) => {
  const [checked, setChecked] = useState(false)
  const history = useNavigate()
  return (
    <Col>
      <Card className='mb-4' border="primary" style={{width: '18rem'}}
      >
        <Card.Img variant="top"
          src={process.env.REACT_APP_API_URL + '/' + product.img} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Button className="m-1" variant="outline-secondary"
            onClick={() => history(PRODUCT_ROUTE + '/' + product.id)}
          >
            Посмотреть</Button>
          <Button className="m-1" variant="outline-secondary"
            onClick={() => history(PRODUCT_CHANGE_ROUTE + '/' + product.id)}
          >
            Редактировать</Button>
          <Button className="m-1" variant="outline-danger"
            onClick={() => onDelete(product.title)
            }>
            Удалить</Button>
          <br />
          <ToggleButton
            className="m-1"
            id={product.id}
            type="checkbox"
            variant="outline-warning"
            checked={checked}

            onChange={() => setChecked(!checked)}
          >
            Сравнить
          </ToggleButton>
          <br />

        </Card.Body>
      </Card>
    </Col >
  )
}

export default ProductItem
