import React, {useEffect, useState} from 'react'
import {
  getAllFields, dropColumn, addColumn,
  updateRecord, updateIdRecord
} from '../http/commandsApi'
import Form from 'react-bootstrap/Form'
import FieldItem from './FieldsItem'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const TemplateEditorComponent = () => {
  const [editorFields, setEditorFields] = useState([])
  const [fVis, setFVis] = useState(true)
  const [currentField, setCurrnetField] = useState(null)

  console.log(currentField)

  function arrayMove(arr, oldindex, newindex) {
    if (newindex >= arr.length) {
      let k = newindex - arr.length + 1
      while (k--) {
        arr.push(undefined)
      }
    }
    arr.splice(newindex, 0, arr.splice(oldindex, 1)[0])
    return arr
  }

  function dragStartHandler(e, name, id) {
    console.log('drag ' + name + ' id: ' + id)
    setCurrnetField(id)
  }

  function onDragEndHandler(e) {

  }
  function onDragOverHandler(e, name, id) {
    e.preventDefault()
  }
  function dropHandler(e, name, id) {
    e.preventDefault()
    console.log(currentField + ' droped to ' + name + ' id: ' + id)
    setEditorFields([...arrayMove(editorFields, (currentField - 1), (id - 1))])
    console.log(editorFields)
    editorFields.map((field) => {
      if (field.id != editorFields.indexOf(field) + 1) {
        updateIdRecord(field, (editorFields.indexOf(field) + 1))
        console.log('АЙди ' + field.id + ' Позиция ' +
          (editorFields.indexOf(field) + 1))
      }
    })
  }

  useEffect(() => {
    getAllFields().then((data) => {
      setEditorFields(data.data)
    })
  }, [])

  const updateItem = (field, oldVar) => {
    console.log(JSON.stringify(field) + ' ' + oldVar)
    updateRecord(field, oldVar)
  }

  const saveItem = (id) => {
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
        id={fields.id}
        name={fields}
        dragStartHandler={dragStartHandler}
        onDragEndHandler={onDragEndHandler}
        onDragOverHandler={onDragOverHandler}
        dropHandler={dropHandler}
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
