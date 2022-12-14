import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import {createNewProduct} from '../../http/productAPI'
import '../../style/style.css'

const ModalAddProductProp = (prop) => {
  const {show, onHide} = prop
  const [modVars, setModVars] = useState('')
  const [disabledBtn, setDisabledBtn] = useState(true)

  const handleSave = () => {
    createNewProduct(modVars)
    setDisabledBtn(true)
    onHide()
  }
  // const handleShow = () => {
  //   return (show)
  // }

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Название продукта
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Control placeholder="Введите название"
                  onChange={(e) => {
                    setDisabledBtn((e.target.value != '') ? false : true)
                    setModVars(e.target.value)
                  }}
                />
              </Col>
            </Row>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave} disabled={disabledBtn}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}


export default ModalAddProductProp
