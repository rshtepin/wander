import React, {useState} from 'react'

export const Field = (prop) => {
  const {name, delItem, saveItem} = prop
  const [disabledEdit, setDisabledEdit] = useState(true)
  const [disabledSave, setDisabledSave] = useState(true)
  const onBlur = (val) => {
    if (val == '') delItem(name)
    else
    {
      setDisabledEdit(false)
      setDisabledSave(true)
      saveItem(val)
    }
  }
  const onChange = (val) => {
    if (val == '')
    {
      delItem(name)
    } else
    {
      setDisabledEdit(false)
      setDisabledSave(false)
      saveItem(val)
    }
  }
  return <div className="windowsfieldBG mt-2">
    <input className="input" onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => onBlur(e.target.value)}
      type="text" name="fieled" placeholder={name} autoFocus />
    {/* <input className="input"
      type="text" name="filed" placeholder="Select type" /> */}

    <select className="ml-2">
      <option value="0">Pure CSS Select</option>
      <option value="1">No Wrapper</option>
      <option value="2">No JS</option>
      <option value="3">Nice!</option>
    </select>

    <button
      className="custom-btn
      button-edit-windowsfieldBG_edit ml-2"
      disabled={disabledEdit}>
      EDIT
    </button>

    <button
      className="custom-btn
      button-edit-windowsfieldBG_save ml-05"
      onClick={() => saveItem(name)}
      disabled={disabledSave}>
      SAVE
    </button>

    <button onClick={() => delItem(name)}
      className="custom-btn
      button-edit-windowsfieldBG_delete
       ml-2">DELETE</button>
  </div >
}
export default Field
