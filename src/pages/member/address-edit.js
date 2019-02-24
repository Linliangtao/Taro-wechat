import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import BaseView from '../base-view'

import memberApi from '../../api/member'

import '../../assets/scss/pages/member/address.scss'

export default class MemberAddressEditView extends BaseView {
  config = {
    navigationBarTitleText: '地址管理'
  }

  constructor () {
    super()

    this.state = {
      id: '',
      form: {}
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
    const { id } = this.$router.params

    if (id) {
      this.setState({ id }, () => {
        this.getData()
      })
    }
  }

  /**
   * 获取数据
   * @return {Promise<void>}
   */
  async getData () {
    try {
      const { id } = this.state
      const params = {
        addressId: id
      }
      const { address: form } = memberApi.getAddress(params)
      this.setState({ form })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  /**
   * 保存地址
   * @return {Promise<void>}
   */
  async saveAddress () {
    try {
      const { form } = this.state
      await memberApi.saveAddress(form)
      this.$util.showToast('保存成功', {
        icon: 'success',
        callback: () => {
          Taro.navigateBack()
        }
      })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  /**
   * 删除地址
   * @return {Promise<void>}
   */
  async deleteAddress () {
    try {
      const { id } = this.state
      const params = {
        addressId: id
      }
      await memberApi.deleteAddress(params)
      this.$util.showToast('删除成功', {
        icon: 'success',
        callback: () => {
          Taro.navigateBack()
        }
      })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }

  /**
   * 点击保存地址
   */
  handleTapSave () {
    this.saveAddress()
  }

  /**
   * 点击删除地址
   */
  handleTapDelete () {
    Taro.showModal({
      title: '提示',
      content: '确定要删除该地址吗？'
    }).then(({ confirm }) => {
      if (confirm) {
        this.deleteAddress()
      }
    })
  }

  /**
   * 点击取消
   */
  handleTapCancel () {
    Taro.navigateBack()
  }

  render () {
    return (
      <View className='i-page-address-edit'></View>
    )
  }
}
