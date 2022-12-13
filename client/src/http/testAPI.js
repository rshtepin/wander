import {$host} from './index'

export const getAllRecords = async () => {
  const response = await $host.get('api/products')
  return response
}

export const getAllFields = async () => {
  const response = await $host.get('api/products/editor')
  return response
}
