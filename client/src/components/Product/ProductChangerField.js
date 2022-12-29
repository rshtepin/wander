import React, {useRef, useState} from 'react'
import Button from 'react-bootstrap/Button'

const ProductChangerField = (prop) => {
  const {title, value, saveClick, sqlVar} = prop
  const [btnStat, setbtnStat] = useState(true)
  const textArea = useRef(title)

  const onSaveClick = () => {
    setbtnStat(!btnStat)
    if (!btnStat) {
      const val = textArea.current.value
      saveClick(val, sqlVar)
    }
  }
  return (
    <form className="productChangerFieldContainer">
      <div>{title}</div>
      <div><textarea ref={textArea} className="productChangerFieldInput"
        disabled={btnStat}
        defaultValue={value}></textarea>
      </div>
      <div >
        <Button variant={(btnStat) ? 'dark mt-2' : 'success mt-2'}
          onClick={() => onSaveClick()} >
          {(btnStat) ? 'Редактировать' : 'Сохранить'}</Button>
      </div>
    </form>
  )
}

export default ProductChangerField
