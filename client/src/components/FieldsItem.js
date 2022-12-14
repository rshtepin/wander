import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import {dropColumn} from '../http/testAPI'

const FieldItem = ({field}) => {
  const [show, setShow] = useState(true)
  const [name, setName] = useState(field.column_name)
  const [dataType, setDataType] = useState(field.data_type)
  const saveButton = async () => {
    setShow(true)
    alert('Name: ' + name + ' Type:' + dataType)
  }

  return (
    <>
      <Stack className="mt-2" direction="horizontal" gap={3}>
        <Form.Control className="me-auto" disabled={show}
          placeholder={name} onChange={(e) => {
            setName(e.target.value)
          }} />
        <Form.Select aria-label="Floating label select example"
          defaultValue={dataType}
          disabled={show} onChange={(e) => {
            setDataType(e.target.value)
          }}>

          <option value="integer">integer</option>
          <option value="ARRAY">ARRAY</option>
          <option value="character varying">character varying</option>
        </Form.Select>

        <Button variant="outline-secondary" disabled={!show}
          onClick={() => setShow(false)} >
          Edit
        </Button><div className="vr" />

        <Button variant="outline-primary" disabled={show}
          onClick={() => saveButton()}>
          Save
        </Button><div className="vr" />

        <Button variant="outline-danger"
          onClick={() => dropColumn(name)}>
          Delete
        </Button>
      </Stack>
    </>
  )
}

export default FieldItem
