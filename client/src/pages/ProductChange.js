import React from 'react'
import {useParams} from 'react-router-dom'
import ProductChanger from '../components/Product/ProductChanger'
const ProductChange = () => {
  const {id} = useParams()
  return (
    <ProductChanger id={id} />
  )
}

export default ProductChange
