import {$host} from './index'
export const getAllRecords = async () => {
  const response = await $host.get('api/test')
  return response
}
