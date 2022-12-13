import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
const TemplateItem = ({field}) => {
  const [show, setShow] = useState(true)
  return (
    <>
      <Stack className="mt-2" direction="horizontal" gap={3}>
        <Form.Control className="me-auto" disabled={show}
          placeholder={field.column_name} />
        <Form.Control className="me-auto"
          disabled={show} placeholder={field.data_type} />
        <Button variant="outline-secondary"
          onClick={() => setShow(false)}>Edit</Button>
        <div className="vr" />
        <Button variant="outline-primary"
          onClick={() => setShow(true)}> Save</Button>
        <div className="vr" />
        <Button variant="outline-danger">Delete</Button>
      </Stack>
    </>
  )
}

export default TemplateItem
