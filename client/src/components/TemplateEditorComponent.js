import React, {useEffect, useState} from 'react'
import {
  getAllFields, dropColumn, addColumn,
  updateRecord
} from '../http/commandsApi'
import Form from 'react-bootstrap/Form'
import FieldItem from './FieldsItem'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const TemplateEditorComponent = () => {
  const [editorFields, setEditorFields] = useState([])
  const [fVis, setFVis] = useState(true)

  useEffect(() => {
    getAllFields().then((data) => {
      setEditorFields(data.data)
      console.log(data.data)
    })
  }, [])

  // const delField = () => {
  //   setEditorFields([])
  //   getAllFields().then((data) => {
  //     setEditorFields(data.data)
  //   })
  // }
  const updateItem = (id, oldVar) => {
    console.log(JSON.stringify(id) + ' ' + oldVar)
    updateRecord(id, oldVar)
  }

  const saveItem = (id) => {
    console.log(id)
    addColumn(id)
  }

  const delItem = (id) => {
    let arr = [...editorFields]
    arr = arr.filter((item) => item.sqlVar !== id)
    setEditorFields([...arr])

    if (id != '') {
      dropColumn(id)
    }
  }


  const addItem = () => {
    setFVis(false)
    setEditorFields((prevVals) =>
      [...prevVals, {
        sqlVar: '',
        showVar: ''
      }])
  }

  return (
    <><Container className="mt-4">
      <Form.Label >Template</Form.Label>
      {editorFields.map((fields) => <FieldItem
        key={fields.sqlVar}
        name={fields}
        delItem={delItem}
        saveItem={saveItem}
        updateItem={updateItem}
        btnPLusFlag={fVis} />)}
      < Button className="mt-2"
        onClick={addItem}>
        +
      </Button>
    </Container >
    </>

  )
}

export default TemplateEditorComponent
