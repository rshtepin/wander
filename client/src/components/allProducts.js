import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import ModalAddProductProp from './windows/ModalAddProductProp'


function TypesExample() {
  const [show, setShow] = useState(false)
  const onHide = () => {
    setShow(false)
  }
  const onClose = () => {
    console.log('onHide')
    setShow(false)
  }
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Вызвать Modal
      </Button>
      <ModalAddProductProp show={show} onHide={onHide} onClose={onClose} />
    </>
  )
}

export default TypesExample
