import React, {useState, useRef} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'

const FieldItem = (prop) => {
  const colomnInputVar = useRef(null)
  const colomnInputShow = useRef(null)
  // ///////////////////////////////////////////////////
  const {name, delItem, saveItem, btnPLusFlag, updateItem,
    dragStartHandler, onDragEndHandler,
    onDragOverHandler, dropHandler, id} = prop
  const [disabledEdit, setDisabledEdit] = useState(!btnPLusFlag)
  const [disabledSave, setDisabledSave] = useState(true)
  const [showInput, setShowInput] = useState(btnPLusFlag)
  const [inputValueVar, setinputValueVar] = useState(name.sqlVar)
  const [inputValueShowVar, setinputValueShowVar] = useState(name.showVar)
  const [btnEditFlag, setBtnEditFlag] = useState(false)

  const saveButton = () => {
    if (btnEditFlag) {
      setShowInput(true)
      setinputValueVar(name.sqlVar)
      setinputValueShowVar(name.showVar)
      updateItem(name, inputValueVar)
      setDisabledEdit(false)
      setDisabledSave(true)
    } else {
      setShowInput(true)
      setinputValueVar(name.sqlVar)
      setinputValueShowVar(name.showVar)
      saveItem(name)
      setDisabledEdit(false)
      setDisabledSave(true)
    }
  }
  const editClick = () => {
    setBtnEditFlag(true)
    setShowInput(false)
    setDisabledEdit(true)
    setDisabledSave(false)
  }

  const onBlurVar = (val) => {
    console.log(inputValueVar)
    if ((val == '') && !btnEditFlag) {
      delItem(name.sqlVar)
    }
    if (((val == '') && btnEditFlag)) {
      colomnInputVar.current.value = inputValueVar
      colomnInputShow.current.value = inputValueShowVar
      name.sqlVar = inputValueVar
      setDisabledEdit(false)
      setDisabledSave(true)
      setShowInput(true)
    } else {
      setDisabledEdit(true)
      setDisabledSave(false)
    }
  }
  const onBlurShowVar = (val) => {
    if ((val == '') && !btnEditFlag) {
      delItem(name.showVar)
    }
    if (((val == '') && btnEditFlag) || (name.sqlVar == '')) {
      colomnInputVar.current.value = inputValueVar
      colomnInputShow.current.value = inputValueShowVar
      name.showVar = inputValueShowVar
      setDisabledEdit(false)
      setDisabledSave(true)
      setShowInput(true)
    } else {
      setDisabledEdit(true)
      setDisabledSave(false)
    }
  }

  const onChangeInputVar = (val) => {
    console.log(inputValueShowVar)
    name.sqlVar = val
    if ((name.showVar == '') || (name.sqlVar == '')) {
      setDisabledEdit(true)
      setDisabledSave(true)
    } else {
      setDisabledSave(false)
    }
  }
  const onChangeInputShow = (val) => {
    name.showVar = val
    if ((name.showVar == '') || (name.sqlVar == '')) {
      setDisabledEdit(true)
      setDisabledSave(true)
    } else {
      setDisabledSave(false)
    }
  }
  return (
    <>
      <Stack
        draggable={true}
        onDragStart={(e) => dragStartHandler(e, name.sqlVar, id)}
        onDragLeave={(e) => onDragEndHandler(e)}
        onDragEnd={(e) => onDragEndHandler(e)}
        onDragOver={(e) => onDragOverHandler(e, name.sqlVar, id)}
        onDrop={(e) => dropHandler(e, name.sqlVar, id)}

        className="mt-2" direction="horizontal" gap={3}>
        <Form.Control ref={colomnInputVar}
          placeholder="SQL ???????????????????? ?????????? ???????????? (ENG)"
          className="me-auto" disabled={showInput}
          defaultValue={name.sqlVar}
          onChange={(e) => onChangeInputVar(e.target.value)}
          onBlur={(e) => onBlurVar(e.target.value)} autoFocus
        />
        <Form.Control ref={colomnInputShow}
          placeholder="?????????????????? ?????? ????????????????????????"
          className="me-auto" disabled={showInput}
          defaultValue={name.showVar}
          onChange={(e) => onChangeInputShow(e.target.value)}
          onBlur={(e) => onBlurShowVar(e.target.value)}
        />
        <Button variant="outline-secondary" disabled={disabledEdit}
          onClick={() => editClick()} >
          ??????????????????????????
        </Button><div className="vr" />

        <Button variant="outline-primary" disabled={disabledSave}
          onClick={() => saveButton()}>
          ??????????????????
        </Button><div className="vr" />

        <Button variant="outline-danger"
          onClick={() => {
            delItem(name.sqlVar)
          }}>
          ??????????????
        </Button>
      </Stack>
    </>
  )
}

export default FieldItem
