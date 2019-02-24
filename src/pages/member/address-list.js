import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import BaseView from '../base-view'

import memberApi from '../../api/member'

import '../../assets/scss/pages/member/address.scss'

export default class MemberAddressListView extends BaseView {
  config = {
    navigationBarTitleText: '地址管理'
  }

  constructor () {
    super()

    this.state = {
      addressList: [] // 地址列表
    }
  }

  componentDidShow () {
    this.checkLogin().then(() => {
      this.init()
    })
  }

  /**
   * 初始化
   */
  init () {
    this.getAddressList()
  }

  /**
   * 获取地址列表
   * @return Promise<any>
   */
  async getAddressList () {
    try {
      const { addressList } = await memberApi.getAddressList()
      this.setState({ addressList })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  /**
   * 点击添加地址
   */
  handleTapAdd () {
    Taro.navigateTo({
      url: '/pages/member/address-edit'
    })
  }

  /**
   * 点击编辑地址
   * @param item
   */
  handleTapEdit (item) {
    Taro.navigateTo({
      url: `/pages/member/address-edit?id=${item.receive_address_id}`
    })
  }

  render () {
    const { addressList } = this.state
    return (
      <View className='i-page-address-list i-page'>
        {
          addressList.map(item => (
            <View key={item.receive_address_id}>{item.address}</View>
          ))
        }
      </View>
    )
  }
}
