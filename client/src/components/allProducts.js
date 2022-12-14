import React, {useContext, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {getAllRecords} from '../http/testAPI'
import ModalAddProductProp from './windows/ModalAddProductProp'
import {Context} from '../index'
import {observer} from 'mobx-react-lite'
import ProductItem from './ProductItem'

const AllProducts = observer(() => {
  const [show, setShow] = useState(false)
  const {products} = useContext(Context)

  useEffect(() => {
    getAllRecords().then((data) => {
      products.setList(data.data)
    })
  }, [])

  const onHide = () => {
    setShow(false)
  }

  const onClose = () => {
    // console.log('onHide')
    setShow(false)
  }

  return (
    <>
      <Container className="mt-4">
        <Row md={3} className="justify-content-md-center">

          {products._productList.map((products) =>
            <ProductItem key={products.id} product={products} />
          )}

        </Row>
        <Row className="mt-4 ">
          <Button className="mb-4" variant='secondary' >Запрос</Button>
          {/* <Button className="mb-4" variant="primary"
            onClick={() => setShow(true)}>
            Вызвать Modal
          </Button> */}
          <Button variant="danger" href="/products/editor">
            Редактор шаблона
          </Button>
        </Row>
      </Container>
      <ModalAddProductProp show={show} onHide={onHide} onClose={onClose} />
    </>
  )
})

export default AllProducts
