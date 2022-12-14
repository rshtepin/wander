import {$host} from './index'

export const getAllRecords = async () => {
  const response = await $host.get('api/products')
  return response
}

export const getAllFields = async () => {
  const response = await $host.get('api/products/editor')
  return response
}

export const updateRecord = async () => {
  const response = await $host.post('api/products/change')
  return response
}

export const addColumn = async (columnname) => {
  const response =
    await $host.post('api/products/editor/addColumn',
      {'column_name': columnname})
  return response
}

export const dropColumn = async (columnname) => {
  const response =
    await $host.post('api/products/editor/dropColumn',
      {'column_name': columnname})
  return response
}
