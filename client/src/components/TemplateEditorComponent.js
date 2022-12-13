import React, {useContext, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'
import {getAllFields} from '../http/testAPI'
import Form from 'react-bootstrap/Form'
import TemplateItem from './TemplateItem'
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
const TemplateEditorComponent = observer(() => {
  const {editorfields} = useContext(Context)
  useEffect(() => {
    getAllFields().then((data) => {
      editorfields.setList(data.data)
    })
  }, [])
  return (
    <Container className="mt-4">
      <Form.Label htmlFor="inputPassword5">Template</Form.Label>

      {editorfields._List.map((fields) =>
        <TemplateItem key={fields.id} field={fields} />
      )}


    </Container>
  )
})

export default TemplateEditorComponent
