import {$host} from './index'
// import jwt_decode from "jwt-decode"

export const fetchOneDevice = async (id) => {
  const data = await $host.get('api/products/' + id)

  return data
}

export const updateOneField = async (vars, vals, id) => {
  const formData = new FormData()
  formData.append('columnName', vars)
  formData.append('value', vals)
  formData.append('id', id)
  formData.append('img', null)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  const data = await $host.post('api/products/change/' + id,
    formData, config)

  return data
}

export const createNewProduct = async (name) => {
  const {data} = await $host.post('api/products/',
    {
      'title': name
    }
  )

  return data
}
