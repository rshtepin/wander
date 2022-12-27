import React, {useContext, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {getAllRecords} from '../http/commandsApi'
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
    getAllRecords().then((data) => {
      products.setList(data.data)
    })
  }

  const onClose = () => {
    setShow(false)
  }
  const onSave = () => {

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
          <Button className="mb-4" variant="primary"
            onClick={() => setShow(true)}>
            Добавить продукт
          </Button>
          <Button variant="danger" href="/editor">
            Редактор шаблона Info
          </Button>
        </Row>
      </Container>
      <ModalAddProductProp
        show={show} onHide={onHide} onClose={onClose} onSave={onSave} />
    </>
  )
})

export default AllProducts
