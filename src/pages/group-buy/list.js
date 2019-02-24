import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import BaseView from '../base-view'

import GroupBuyApi from '../../api/group-buy'

export default class GroupBuyListView extends BaseView {
  config = {
    navigationBarTitleText: '拼团'
  }

  componentDidShow () {
    this.checkLogin().then(() => {
      this.init()
    })
  }

  componentWillMount () {

  }

  /**
   * 初始化
   * @returns {*}
   */
  init () {
    return this.getData()
  }

  /**
   * 获取数据
   * @returns {*}
   */

  async getData () {
    try {
      const {} = await GroupBuyApi.getGroupBuyList()
      this.setState({

      })
    } catch (e) {
      this.$util.showToast(e.errmsg)
    }
  }


  render () {
    return (
      <View className='i-page-group-buy-list'>
       拼团列表
      </View>
    )
  }
}
