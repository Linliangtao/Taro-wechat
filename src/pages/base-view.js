import Taro, { Component } from '@tarojs/taro'
import util from '../utils'
import { STORAGE } from '../constants'

/**
 * 视图基础类
 */
export default class BaseView extends Component {
  $util = util

  constructor () {
    super()
  }

  /**
   * 检查登录
   * @return Promise<any>
   */
  checkLogin () {
    return new Promise((resolve, reject) => {
      const sessionKey = Taro.getStorageSync(STORAGE.SESSION_KEY)
      const user = Taro.getStorageSync(STORAGE.USER)
      let valid = true
      if (!sessionKey) {
        Taro.navigateTo({
          url: '/pages/home/login'
        })
        valid = false
      }

      if (valid) {
        resolve(sessionKey, user)
      } else {
        reject()
      }
    })
  }

  /**
   * 双向数据绑定
   * @param stateKey
   * @param e
   */
  twoWay (stateKey, e) {
    const keys = stateKey.split('.')
    const key = keys[0]
    let value = ''

    if (keys.length > 1) {
      let target = this.state
      value = target[key]

      keys.forEach((item, index) => {
        if (index < keys.length - 1) {
          target = target[item]
        } else {
          target[item] = e.detail.value
        }
      })
    } else {
      value = e.detail.value
    }

    this.setState({
      [key]: value
    })
  }
}
