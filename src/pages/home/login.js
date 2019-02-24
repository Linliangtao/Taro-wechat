import Taro from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import BaseView from '../base-view'

import { STORAGE } from '../../constants'
import commonApi from '../../api/common'

import '../../assets/scss/pages/home/login.scss'

export default class HomeLoginView extends BaseView {
  config = {
    navigationBarTitleText: '登录'
  }

  code = ''
  userInfo = {}
  encryptedData = ''
  iv = ''

  constructor () {
    super()

    this.state = {}
  }

  /**
   * 点击登录
   * @param e
   */
  handleGetUserInfo (e) {
    const { userInfo, encryptedData, iv } = e.detail
    this.userInfo = userInfo
    this.encryptedData = encryptedData
    this.iv = iv
    Taro.login().then(({ code }) => {
      this.code = code
      this.login()
    })
  }

  /**
   * 授权登录
   */
  async login () {
    try {
      const params = {
        code: this.code,
        userInfo: this.userInfo,
        encryptedData: this.encryptedData,
        iv: this.iv
      }
      const res = await commonApi.authorize(params)
      Taro.setStorageSync(STORAGE.USER, this.userInfo)
      Taro.setStorageSync(STORAGE.SESSION_KEY, res.session_key)
      Taro.navigateBack()
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  render () {
    return (
      <View className='i-page-login i-page'>
        <View className='btn-container'>
          <Button className='login' type='primary' openType='getUserInfo' lang='zh_CN' onGetUserInfo={this.handleGetUserInfo}>微信登录</Button>
        </View>
      </View>
    )
  }
}
