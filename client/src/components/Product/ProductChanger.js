import React, {useEffect, useRef, useState} from 'react'
import ProductChangerField from './ProductChangerField'
import {fetchOneDevice, updateOneField} from '../../http/productAPI'
import Button from 'react-bootstrap/esm/Button'
import {$host} from '../../http/index'
const ProductChanger = ({id}) => {
  const [deviceInfo, setdeviceInfo] = useState([])
  const [deviceVar, setdeviceVar] = useState([])
  const [sqlVarRef, setsqlVarRef] = useState([])
  const fileRef = useRef()

  const handleChange = (e) => {
    const [file] = e.target.files
    // console.log(file)
    console.log(__dirname)
    const formData = new FormData()
    formData.append('img', file)
    formData.append('columnName', '')
    formData.append('value', '')
    formData.append('id', id)
    $host.post('api/products/change/' + id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  const saveButton = (val, vars) => {
    console.log(val + ' ' + vars)
    updateOneField(vars, val, id)
    console.log('SAAAVE ' + id)
  }
  useEffect(() => {
    fetchOneDevice(id).then((data) => {
      // const dataAll = data.data
      // eslint-disable-next-line no-unused-vars
      const dataInfo = data.data[0]
      setdeviceVar(dataInfo)
      const dataVar = data.data[1]

      const jsonAttr = {}

      dataVar.forEach((item) => {
        setsqlVarRef((prevVals) =>
          [...prevVals, item.sqlVar])
        const sqlVar = eval('dataInfo.' + item.sqlVar)
        jsonAttr[item.showVar] = sqlVar
        // console.log(item)
      })
      setdeviceInfo(jsonAttr)
    }
    )
  }, [])
  console.log(deviceVar.img)
  return (
    <div className="body">
      <div className="productChangerMainFrame">
        <div className="productChangerTitleContainer">
          <div className="imgDiv">
            <img className="imageAvatar"
              src={process.env.REACT_APP_API_URL + deviceVar.img}></img>
          </div>
          <Button className="rightButton"
            onClick={() => fileRef.current.click()}>
            +
          </Button>

          <input
            ref={fileRef}
            onChange={handleChange}
            multiple={false}
            type="file"
            hidden
          />
        </div>

        {Object.keys(deviceInfo).map((name) => {
          return <ProductChangerField
            key={name} title={name}
            sqlVar={sqlVarRef[Object.keys(deviceInfo).indexOf(name)]}
            value={deviceInfo[name]} saveClick={saveButton} />
        })}

      </div>

    </div>
  )
}

export default ProductChanger
