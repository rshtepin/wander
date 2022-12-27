import {$host} from './index'

export const getAllRecords = async () => {
  try {
    const response = await $host.get('api/products')
    return response
  } catch (error) {
    console.log('Error in getAllRecords: ' + error)
  }
}

export const getAllFields = async () => {
  try {
    const response = await $host.get('api/editor')
    return response
  } catch (error) {
    console.log('Error in getAllFields: ' + error)
  }
}

export const updateRecord = async (field, oldSql) => {
  try {
    console.log(field)
    const response =
      await $host.post('api/editor/update',
        {
          'sqlVar': field.sqlVar,
          'showVar': field.showVar,
          'oldSqlVar': oldSql
        })

    return response
  } catch (error) {
    console.log('Error in commandAPI.addColumn: ' + error)
  }
}

export const addColumn = async (field) => {
  try {
    console.log(field)
    const response =
      await $host.post('api/editor/addColumn',
        {
          'sqlVar': field.sqlVar,
          'showVar': field.showVar
        })

    return response
  } catch (error) {
    console.log('Error in commandAPI.addColumn: ' + error)
  }
}

export const dropColumn = async (columnname) => {
  try {
    const response =
      await $host.post('api/editor/dropColumn',
        {'sqlVar': columnname})
    return response
  } catch (error) {
    console.log('Error in dropColumn: ' + error)
  }
}
