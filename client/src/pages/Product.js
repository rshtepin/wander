import React, {useEffect, useState} from 'react'

import {useParams} from 'react-router-dom'
import {fetchOneDevice} from '../http/productAPI'
import '../style/product.css'
import {ProductPropFields} from '../components/Product/ProductPropFields'

const Product = () => {
  console.log('Render')
  const {id} = useParams()
  const [deviceInfo, setdeviceInfo] = useState([])
  const [deviceVar, setdeviceVar] = useState([])
  useEffect(() => {
    fetchOneDevice(id).then((data) => {
      // const dataAll = data.data
      // eslint-disable-next-line no-unused-vars
      const dataInfo = data.data[0]
      setdeviceVar(dataInfo)
      const dataVar = data.data[1]

      const jsonAttr = {}

      dataVar.forEach((item) => {
        const sqlVar = eval('dataInfo.' + item.sqlVar)
        jsonAttr[item.showVar] = sqlVar
        // console.log(item)
      })
      setdeviceInfo(jsonAttr)
    }

    )
  }, [])

  // console.log(Object.keys(deviceInfo))

  // const result = []
  // if (deviceInfo != null) {
  //   for (const i in deviceInfo) {
  //     if (i != 0) {
  //       result.push([i, deviceInfo])
  //     }
  //   }
  //   // console.log(result)
  // }

  return (
    <><div className="body">
      <div className="backProductpropcard">
        <div className="imgDiv">
          {(deviceVar != null) ? deviceVar.title : ''}
        </div>
        {Object.keys(deviceInfo).map((name) => {
          return <ProductPropFields
            key={name} names={name} values={deviceInfo[name]} />
        })}
      </div>
    </div>
    </>
  )
}
export default Product
