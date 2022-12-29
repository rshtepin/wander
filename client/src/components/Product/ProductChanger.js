import React, {useEffect, useState} from 'react'
import ProductChangerField from './ProductChangerField'
import {fetchOneDevice, updateOneField} from '../../http/productAPI'

const ProductChanger = ({id}) => {
  const [deviceInfo, setdeviceInfo] = useState([])
  const [deviceVar, setdeviceVar] = useState([])
  const [sqlVarRef, setsqlVarRef] = useState([])

  const saveButton = (val, vars) => {
    console.log(val + ' ' + vars)
    updateOneField(vars, val, id)
    console.log('SAAAVE')
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
  // console.log(sqlVarRef)
  return (
    <div className="body">
      <div className="productChangerMainFrame">
        <div className="productChangerTitleContainer">
          {(deviceVar != null) ? deviceVar.title : ''}</div>

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
