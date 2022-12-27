import {$host} from './index'
// import jwt_decode from "jwt-decode"

export const fetchOneDevice = async (id) => {
  const data = await $host.get('api/products/' + id)

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
