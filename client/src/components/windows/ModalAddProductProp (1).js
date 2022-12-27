import React, {useContext, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {Context} from '../../index'
import {addColumn} from '../../http/commandsApi'
import '../../style/style.css'

const ModalAddProductProp = (prop) => {
  const {show, onHide, onClose} = prop
  const [modVars, setModVars] = useState(['', ''])
  const {editorfields} = useContext(Context)

  const handleSave = () => {
    console.log('handleClose')
    editorfields.addItem({
      'column_name': modVars[0],
      'data_type': 'character varying'
    })
    addColumn(modVars[0])
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
            Переменные
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Control placeholder="First name"
                  onChange={(e) =>
                    setModVars([e.target.value, modVars.at(1)])}
                />
              </Col>
              <Col>
                <Form.Control placeholder="Last name"
                  onChange={(e) =>
                    setModVars([modVars.at(0), e.target.value])}
                />
              </Col>
            </Row>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}


export default ModalAddProductProp
