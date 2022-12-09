import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import {getAllRecords} from '../http/testAPI'
import ModalAddProductProp from './windows/ModalAddProductProp'
import BasicExample from './ProdutsProperties'

const view = async () => {
  const response = await getAllRecords()
  const myData = response.data
  console.log(...myData)
}

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
      <Button variant='secondary' onClick={view}> Запрос</Button>
      <Button variant="primary" onClick={() => setShow(true)}>
        Вызвать Modal
      </Button>
      <BasicExample />
      <ModalAddProductProp show={show} onHide={onHide} onClose={onClose} />
    </>
  )
}

export default TypesExample
