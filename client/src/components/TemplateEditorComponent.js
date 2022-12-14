import React, {useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'
import {getAllFields} from '../http/testAPI'
import Form from 'react-bootstrap/Form'
import FieldItem from './FieldsItem'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ModalAddProductProp from './windows/ModalAddProductProp'

const TemplateEditorComponent = observer(() => {
  const {editorfields} = useContext(Context)
  const [show, setShow] = useState(false)

  useEffect(() => {
    getAllFields().then((data) => {
      editorfields.setList(data.data)
    })
  }, [])

  const onHide = () => {
    setShow(false)
  }

  const onClose = () => {
    // console.log('onHide')
    setShow(false)
  }

  const plusButton = async () => {
    setShow(true)
  }
  return (
    <Container className="mt-4">
      <Form.Label htmlFor="inputPassword5">Template</Form.Label>

      {editorfields._List.map((fields) =>
        <FieldItem key={fields.id} field={fields} />
      )}

      <Button className="pull-right mt-2"
        onClick={() => {
          plusButton()
        }}>
        +
      </Button>
      <ModalAddProductProp show={show} onHide={onHide} onClose={onClose} />
    </Container >

  )
})

export default TemplateEditorComponent
