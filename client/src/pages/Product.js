import React, {useEffect, useState} from 'react'

import {useParams} from 'react-router-dom'
import {fetchOneDevice} from '../http/productAPI'
import '../style/product.css'
import {ProductPropFields} from '../components/Product/ProductPropFields'

const Product = () => {
  console.log('Render')
  const {id} = useParams()
  const [device, setDevice] = useState()

  useEffect(() => {
    fetchOneDevice(id).then((data) => {
      const i = JSON.parse(JSON.stringify(data.data[0]))
      setDevice(i)
      console.log(Object.values(i))
      console.log(Object.keys(i))
    })
  }, [])

  const result = []
  if (device != null) {
    for (const i in device) {
      if (i != 0) {
        result.push([i, device])
      }
    }
    // console.log(result)
  }

  return (
    <><div className="body">
      <div className="backProductpropcard">
        <div className="imgDiv">
          {(device != null) ? device.title : ''}
        </div>
        {<ProductPropFields />}
      </div>
    </div>
    </>
  )
}
export default Product
