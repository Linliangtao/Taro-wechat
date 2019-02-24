import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import BaseView from '../base-view'

import '../../assets/scss/pages/member/coupon.scss'

export default class MemberCouponListView extends BaseView {
  config = {
    navigationBarTitleText: '优惠券列表'
  }

  constructor () {
    super()
  }

  componentDidShow () {
    this.checkLogin().then(() => {
      this.init()
    })
  }

  /**
   * 初始化
   */
  init () {}

  render () {
    return (
      <View className='i-page-member-coupon-list i-page'>
        <View className='coupon-list'>
          <View className='cl-item'>
            <Text className='cl-name'>5折优惠券</Text>
            <Text className='cl-condition'>满10元即可使用</Text>
            <Text className='cl-range'>使用范围：全场通用，原价购买</Text>
            <Text className='cl-time'>2019年02月21日前有效</Text>
            <View className='cl-value'>
              <Text className='cl-value-text'>50</Text>
              <Text className='cl-value-unit'>%</Text>
              <Text className='cl-value-addon'>OFF</Text>
            </View>
          </View>
          <View className='cl-item'>
            <Text className='cl-name'>100元优惠券</Text>
            <Text className='cl-condition'>满350元即可使用</Text>
            <Text className='cl-range'>使用范围：全场通用，原价购买</Text>
            <Text className='cl-time'>2019年02月21日前有效</Text>
            <View className='cl-value'>
              <Text className='cl-value-text'>100</Text>
              <Text className='cl-value-unit'>元</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
