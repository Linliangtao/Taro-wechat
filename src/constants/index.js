import * as STORAGE from './storage'
import * as QUERY from './query'

export const HOST = process.env.NODE_ENV === 'production' ? 'https://weishop.wxm.i-mybest.com' : 'https://weixishop.uat.dears.cc'
export const API_ROOT = `${HOST}/api`

export {
  STORAGE,
  QUERY
}
